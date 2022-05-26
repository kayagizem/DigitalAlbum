import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet, Pressable } from 'react-native';

import AlbumView from '../components/AlbumView';
import HeaderBar from '../components/HeaderBar';

import { useStateValue } from '../StateProvider';

import { getAlbumData } from '../backend/firebase';

function UserProfileScreen({ navigation }) {
    const [state, dispatch] = useStateValue();

    const [albums, setAlbums] = useState([]);
    const [albumsIndex, setAlbumsIndex] = useState(0);

    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = React.useCallback(() => {
        const refreshUser = async () => {
            let albumsData = [];
            switch (albumsIndex) {
                case 1:
                    albumsData = await fetchAlbumsAsync(state.userContributedAlbums);
                    break;
                case 2:
                    albumsData = await fetchAlbumsAsync(state.userFollowedAlbums);
                    break;
                default:
                    albumsData = await fetchAlbumsAsync(state.userOwnedAlbums);
                    break;
            }
            setAlbums(albumsData);
        }
        refreshUser().catch(() => { });
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            setRefreshing(true);
            let albumsData = [];
            switch (albumsIndex) {
                case 1:
                    albumsData = await fetchAlbumsAsync(state.userContributedAlbums);
                    break;
                case 2:
                    albumsData = await fetchAlbumsAsync(state.userFollowedAlbums);
                    break;
                default:
                    albumsData = await fetchAlbumsAsync(state.userOwnedAlbums);
                    break;
            }
            setAlbums(albumsData);
            setRefreshing(false);
        }

        fetchUser().catch(() => { });
    }, [state.reload, albumsIndex]);

    const fetchAlbumsAsync = async (albumList) => {
        let albumData = [];
        for (let i = 0; i < albumList.length; i++) {
            let data = await getAlbumData(albumList[i]);
            albumData.push(data);
        }
        albumData = albumData.sort((a, b) => b.dateCreated - a.dateCreated);
        return albumData;
    }

    const renderAlbums = ({ item }) => (
        <AlbumView style={{ flex: 1 / 3, margin: 1 }} albumId={item.albumId} albumCoverURI={item.albumCoverURI} nav={navigation} />
    );

    if (refreshing) {
        return (
            <View style={[styles.screen, { backgroundColor: state.theme.colors.background, }]}>
                <HeaderBar title={state.userData.username}
                    isId
                    leftButtonText="Create"
                    onPressLeft={() => navigation.navigate("Album Creation")}
                    rightButtonText="Settings"
                    onPressRight={() => {
                        navigation.navigate("Profile Settings");
                    }}
                />
                <FlatList
                    ListHeaderComponent={
                        < View style={[styles.profileBlock, { borderColor: state.theme.colors.primary }]} >
                            <View style={styles.profileContainer}>
                                {state.userData.profilePictureURI != "" ?
                                    (
                                        <Image style={[styles.profilePicture, { borderColor: state.theme.colors.border, }]}
                                            source={{ uri: state.userData.profilePictureURI }}>
                                        </Image>
                                    ) : (
                                        <View style={[styles.profilePicture, { borderColor: state.theme.colors.border, }]} />
                                    )}
                                <View style={styles.profileButtonContainer}>
                                    <Pressable
                                        style={[styles.profileButton,
                                        {
                                            borderTopLeftRadius: 45,
                                            borderBottomLeftRadius: 45,
                                            backgroundColor: (albumsIndex == 1) ? state.theme.colors.buttonPressed : state.theme.colors.button
                                        }]}
                                        onPress={() => {
                                            if (albumsIndex == 1) {
                                                setAlbumsIndex(0);
                                            }
                                            else {
                                                setAlbumsIndex(1);
                                            }
                                        }}>
                                        <Text style={[styles.profileButtonText, { color: state.theme.colors.buttonText }]}>Albums</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.profileButton,
                                        {
                                            borderTopRightRadius: 45,
                                            borderBottomRightRadius: 45,
                                            backgroundColor: (albumsIndex == 2) ? state.theme.colors.buttonPressed : state.theme.colors.button
                                        }]}
                                        onPress={() => {
                                            if (albumsIndex == 2) {
                                                setAlbumsIndex(0);
                                            }
                                            else {
                                                setAlbumsIndex(2);
                                            }
                                        }}>
                                        <Text style={[styles.profileButtonText, { color: state.theme.colors.buttonText }]}>Follows</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Text style={[styles.profileName, { color: state.theme.colors.text, }]}>
                                {state.userData.name}
                            </Text>
                            <Text style={[styles.profileBio, { color: state.theme.colors.text, }]} numberOfLines={4}>
                                {state.userData.biography}
                            </Text>
                        </View >
                    }
                    style={{ marginBottom: 5 }}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    data={[]}
                    renderItem={renderAlbums}
                    keyExtractor={item => item.albumId}
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
    return (
        <View style={[styles.screen, { backgroundColor: state.theme.colors.background, }]}>
            <HeaderBar title={state.userData.username}
                isId
                leftButtonText="Create"
                onPressLeft={() => navigation.navigate("Album Creation")}
                rightButtonText="Settings"
                onPressRight={() => {
                    navigation.navigate("Profile Settings");
                }}
            />
            <FlatList
                ListHeaderComponent={
                    < View style={[styles.profileBlock, { borderColor: state.theme.colors.primary }]} >
                        <View style={styles.profileContainer}>
                            {state.userData.profilePictureURI != "" ?
                                (
                                    <Image style={[styles.profilePicture, { borderColor: state.theme.colors.border, }]}
                                        source={{ uri: state.userData.profilePictureURI }}>
                                    </Image>
                                ) : (
                                    <View style={[styles.profilePicture, { borderColor: state.theme.colors.border, }]} />
                                )}
                            <View style={styles.profileButtonContainer}>
                                <Pressable
                                    style={[styles.profileButton,
                                    {
                                        borderTopLeftRadius: 45,
                                        borderBottomLeftRadius: 45,
                                        backgroundColor: (albumsIndex == 1) ? state.theme.colors.buttonPressed : state.theme.colors.button
                                    }]}
                                    onPress={() => {
                                        if (albumsIndex == 1) {
                                            setAlbumsIndex(0);
                                        }
                                        else {
                                            setAlbumsIndex(1);
                                        }
                                    }}>
                                    <Text style={[styles.profileButtonText, { color: state.theme.colors.buttonText }]}>Albums</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.profileButton,
                                    {
                                        borderTopRightRadius: 45,
                                        borderBottomRightRadius: 45,
                                        backgroundColor: (albumsIndex == 2) ? state.theme.colors.buttonPressed : state.theme.colors.button
                                    }]}
                                    onPress={() => {
                                        if (albumsIndex == 2) {
                                            setAlbumsIndex(0);
                                        }
                                        else {
                                            setAlbumsIndex(2);
                                        }
                                    }}>
                                    <Text style={[styles.profileButtonText, { color: state.theme.colors.buttonText }]}>Follows</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={[styles.profileName, { color: state.theme.colors.text, }]}>
                            {state.userData.name}
                        </Text>
                        <Text style={[styles.profileBio, { color: state.theme.colors.text, }]} numberOfLines={4}>
                            {state.userData.biography}
                        </Text>
                    </View >
                }
                style={{ marginBottom: 5 }}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={albums}
                renderItem={renderAlbums}
                keyExtractor={item => item.albumId}
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
    profileBlock: {
        flexDirection: 'column',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        maxHeight: 230
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
    },
    profileBio: {
        fontSize: 14,
        marginTop: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
        margin: 2
    },
    profileButtonText: {
        fontSize: 14,
    },
    profileButtonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
});

export default UserProfileScreen;