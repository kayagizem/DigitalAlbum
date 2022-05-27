import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import PostView from '../components/PostView';
import GeneralButton from '../components/GeneralButton';

import { useTheme } from '@react-navigation/native';

import { useStateValue } from '../StateProvider';

import { followAlbum, contributeAlbum, getAlbumData, getPosts, uncontribute, unfollow, addNotification } from '../backend/firebase';

import { Ionicons } from '@expo/vector-icons';

function AlbumScreen({ route, navigation }) {
    const { colors } = useTheme();

    const [state, dispatch] = useStateValue();

    const [albumData, setAlbumData] = useState({ albumId: route.params.albumId, albumName: '' });
    const [posts, setPosts] = useState([]);

    const [viewApproved, setViewApproved] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const [followState, setFollowState] = useState(state.userOwnedAlbums.includes(route.params.albumId) ||
        state.userContributedAlbums.includes(route.params.albumId) ||
        state.userFollowedAlbums.includes(route.params.albumId));

    const onRefresh = React.useCallback(() => {
        const refreshAlbum = async () => {
            let albumData = await getAlbumData(route.params.albumId);
            setAlbumData(albumData);
            setFollowState(
                state.userOwnedAlbums.includes(route.params.albumId) ||
                state.userContributedAlbums.includes(route.params.albumId) ||
                state.userFollowedAlbums.includes(route.params.albumId)
            );
            if (albumData.type == 2 && !followState) {
                setViewApproved(false);
                setRefreshing(false);
            } else {
                let posts = await getPosts(route.params.albumId);
                posts = posts.sort((a, b) => b.dateCreated - a.dateCreated);
                setPosts(posts);
                setViewApproved(true);
                setRefreshing(false);
            }
        }

        refreshAlbum().catch(() => { });
    }, []);

    useEffect(() => {
        const fetchAlbum = async () => {
            setRefreshing(true);
            let albumData = await getAlbumData(route.params.albumId);
            setAlbumData(albumData);
            if (albumData.albumType == 2 && !followState) {
                setViewApproved(false);
                setRefreshing(false);
            } else {
                let posts = await getPosts(route.params.albumId);
                posts = posts.sort((a, b) => b.dateCreated - a.dateCreated);
                setPosts(posts);
                setViewApproved(true);
                setRefreshing(false);
            }
        }

        fetchAlbum().catch(() => { });
    }, [state.reload, viewApproved]);

    console.log("t")
    const drawButton = () => {
        if (albumData.albumType == 0) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    < GeneralButton
                        text="Global"
                        disabled

                    />
                    {state.userFollowedAlbums.includes(route.params.albumId) ? (
                        <GeneralButton
                            text="Unfollow"
                            onPress={async () => {
                                let data = {
                                    albumId: route.params.albumId,
                                    username: state.userData.username
                                }
                                await unfollow(data);
                                dispatch({
                                    type: 'reloadState',
                                    payload: !state.reload
                                })
                            }}
                        />
                    ) : (
                        <GeneralButton
                            text="Follow"
                            onPress={async () => {
                                let data = {
                                    albumId: route.params.albumId,
                                    username: state.userData.username
                                }
                                if (albumData.albumType == 2) {
                                    let data = {
                                        from: state.userData.username,
                                        albumId: route.params.albumId,
                                        type: "follow"
                                    };
                                    await addNotification(data);
                                } else {
                                    await followAlbum(data);
                                }
                                dispatch({
                                    type: 'reloadState',
                                    payload: !state.reload
                                });
                            }}
                        />
                    )
                    }
                </View>
            );
        }
        if (state.userOwnedAlbums.includes(route.params.albumId)) {
            return (
                <GeneralButton
                    disabled
                    text="Owning"
                />
            );
        }
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                {state.userContributedAlbums.includes(route.params.albumId) ? (
                    <GeneralButton
                        text="Leave"
                        onPress={async () => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            await uncontribute(data);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}
                    />
                ) : (
                    < GeneralButton
                        text="Join"
                        onPress={async () => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            if (albumData.albumType == 1 || albumData.albumType == 2) {
                                let data = {
                                    from: state.userData.username,
                                    albumId: route.params.albumId,
                                    type: "contribute"
                                };
                                await addNotification(data);
                            } else {
                                await contributeAlbum(data);
                            }
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}

                    />
                )
                }
                {state.userFollowedAlbums.includes(route.params.albumId) ? (
                    <GeneralButton
                        text="Unfollow"
                        onPress={async () => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            await unfollow(data);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            })
                        }}
                    />
                ) : (
                    <GeneralButton
                        text="Follow"
                        onPress={async () => {
                            let data = {
                                albumId: route.params.albumId,
                                username: state.userData.username
                            }
                            if (albumData.albumType == 2) {
                                let data = {
                                    from: state.userData.username,
                                    albumId: route.params.albumId,
                                    type: "follow"
                                };
                                await addNotification(data);
                            } else {
                                await followAlbum(data);
                            }
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }}
                    />
                )
                }
            </View>
        );
    }

    const renderImages = ({ item }) => (
        <PostView style={{ flex: 1 / 3, margin: 1 }}
            imageURI={item.imageURI}
            username={item.username}
            caption={item.caption}
            postId={item.postId}
            likeCount={item.likeCount}
            nav={navigation}
        />
    );

    if (refreshing) {
        return (
            <View style={[styles.screen, { backgroundColor: state.theme.colors.background }]}>
                <HeaderBar title={albumData.albumId}
                    isId
                    leftButtonText="Back"
                    onPressLeft={() => navigation.goBack()}
                />
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
            </View >
        );
    }
    if (!viewApproved) {
        return (
            <View style={[styles.screen, { backgroundColor: state.theme.colors.background }]}>
                <HeaderBar title={albumData.albumId}
                    isId
                    leftButtonText="Back"
                    onPressLeft={() => navigation.goBack()}
                />

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
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Ionicons name="lock-closed-outline" size={200} color={colors.primary} />
                </View>
            </View >
        );
    }
    return (
        <View style={[styles.screen, { backgroundColor: state.theme.colors.background }]}>
            <HeaderBar title={albumData.albumId}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
                rightButtonText={
                    (state.userContributedAlbums.includes(route.params.albumId) || albumData.albumType == 0)
                        ? "Post"
                        : ""}
                onPressRight={() => {
                    if ((state.userContributedAlbums.includes(route.params.albumId) || albumData.albumType == 0)) {
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
                    < RefreshControl
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