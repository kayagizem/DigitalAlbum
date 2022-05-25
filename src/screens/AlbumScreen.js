import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import ImageView from '../components/ImageView';
import GeneralButton from '../components/GeneralButton';

import { useStateValue } from '../StateProvider';

import { followAlbum, contributeAlbum, getAlbumData, getPosts, uncontribute, unfollow } from '../backend/firebase'

function AlbumScreen({ route, navigation }) {
    const [state, dispatch] = useStateValue();

    const [albumData, setAlbumData] = useState('');
    const [posts, setPosts] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        const refreshAlbum = async () => {
            let albumData = await getAlbumData(route.params.albumId);
            setAlbumData(albumData);
            let posts = await getPosts(route.params.albumId);
            posts = posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setPosts(posts);
        }

        refreshAlbum().catch(() => { });
    }, []);

    useEffect(() => {
        const fetchAlbum = async () => {
            setRefreshing(true);
            let albumData = await getAlbumData(route.params.albumId);
            setAlbumData(albumData);
            let posts = await getPosts(route.params.albumId);
            posts = posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setPosts(posts);
            setRefreshing(false);
        }

        fetchAlbum().catch(() => { });
    }, []);

    const drawButton = () => {
        if (state.userOwnedAlbums.includes(route.params.albumId)) {
            return (
                <GeneralButton
                    disabled
                    text="Owning"
                />
            );
        } else if (state.userContributedAlbums.includes(route.params.albumId)) {
            return (
                <GeneralButton
                    text="Leave"
                    onPress={() => {
                        let data = {
                            albumId: route.params.albumId,
                            username: state.userData.username
                        }
                        uncontribute(data);
                        dispatch({
                            type: 'reloadState',
                            payload: !state.reload
                        });
                    }}
                />
            );
        } else if (state.userFollowedAlbums.includes(route.params.albumId)) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <GeneralButton
                        text="Join"
                        onPress={() => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            contributeAlbum(data);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}
                    />
                    <GeneralButton
                        text="Unfollow"
                        onPress={() => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            unfollow(data);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <GeneralButton
                        text="Join"
                        onPress={() => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            contributeAlbum(data);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}

                    />
                    <GeneralButton
                        text="Follow"
                        onPress={() => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            followAlbum(data);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}
                    />
                </View>
            );
        }
    }

    const renderImages = ({ item }) => (
        <ImageView style={{ flex: 1 / 3, margin: 1 }} imageURI={item.imageURI} username={item.username} caption={item.caption} nav={navigation} albumId={albumData.albumId} postId={item.postId} />
    );

    if (refreshing) {
        return (<View></View>)
    }
    return (
        <View style={[styles.screen, { backgroundColor: state.theme.colors.background }]}>
            <HeaderBar title={albumData.albumId}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
                rightButtonText={state.userContributedAlbums.includes(route.params.albumId) ? "Post" : ""}
                onPressRight={() => {
                    if (state.userContributedAlbums.includes(route.params.albumId)) {
                        navigation.navigate("Post Creation", { albumId: route.params.albumId })
                    }
                }}
            />

            <FlatList
                ListHeaderComponent={
                    <View style={[styles.albumBlock, { borderColor: state.theme.colors.primary }]}>
                        <Text style={[styles.albumName, { color: state.theme.colors.text }]}>{albumData.albumName}</Text>
                        <View style={styles.albumButtonContainer}>
                            <View style={[styles.albumButton,
                            {
                                borderTopLeftRadius: 45,
                                borderBottomLeftRadius: 45,
                                backgroundColor: state.theme.colors.primary,
                            }]}>
                                <Text style={[styles.albumButtonText, { color: state.theme.colors.buttonText }]}>Owners</Text>
                            </View>
                            <View style={[styles.albumButton,
                            {
                                borderTopRightRadius: 45,
                                borderBottomRightRadius: 45,
                                backgroundColor: state.theme.colors.primary,
                            }]}>
                                <Text style={[styles.albumButtonText, { color: state.theme.colors.buttonText, }]}>Followers</Text>
                            </View>
                        </View>
                        {drawButton()}
                    </View>
                }
                style={{ marginBottom: 5 }}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                data={posts}
                renderItem={renderImages}
                keyExtractor={item => item.imageURI}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    albumBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        maxHeight: 230
    },
    albumName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    albumButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
    },
    albumButtonText: {
        fontSize: 14,
    },
    albumButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
        margin: 2,
        flex: 1
    },
});

export default AlbumScreen;