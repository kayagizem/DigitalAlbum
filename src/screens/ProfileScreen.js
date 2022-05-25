import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, RefreshControl } from 'react-native';

import AlbumView from '../components/AlbumView';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

import { getOwnedAlbums, getAlbumData, getUserDataByUsername, getContributedAlbums, getFollowedAlbums } from '../backend/firebase';

function ProfileScreen({ route, navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [userData, setUserData] = useState({});

    const [albums, setAlbums] = useState([]);

    const [albumsIndex, setAlbumsIndex] = useState(0);

    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = React.useCallback(() => {
        const refreshUser = async () => {
            let userData = await fetchUserAsync();
            setUserData(userData);
            let albumList = await fetchUserAlbumsAsync(userData.username);
            albumList = albumList.map((album) => album.albumId);
            let listData = await fetchAlbumsAsync(albumList);
            setAlbums(listData);
            setAlbums(albumData);
        }

        refreshUser().catch(() => { });
    }, []);

    useEffect(async () => {
        const fetchUser = async () => {
            setRefreshing(true);
            let userData = await fetchUserAsync();
            setUserData(userData);
            let albumList = await fetchUserAlbumsAsync(userData.username);
            albumList = albumList.map((album) => album.albumId);
            let listData = await fetchAlbumsAsync(albumList);
            setAlbums(listData);
            setRefreshing(false);
        }
        fetchUser().catch(() => { });
    }, [albumsIndex]);

    const fetchUserAsync = async () => {
        let userData = await getUserDataByUsername(route.params.username);
        return userData;
    }

    const fetchUserAlbumsAsync = async (username) => {
        switch (albumsIndex) {
            case 1:
                let followed = await getFollowedAlbums(username);
                return followed;
            case 2:
                let contributed = await getContributedAlbums(username);
                return contributed;
            default:
                let owned = await getOwnedAlbums(username);
                return owned;
        }
    }

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
            <View style={styles.screen}>
                <HeaderBar title=""
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
                        < View style={styles.profileBlock} >
                            <View style={styles.profileContainer}>
                                <View style={styles.profilePicture} />
                                <View style={styles.profileButtonContainer}>
                                    <Pressable style={[styles.profileButton,
                                    {
                                        borderTopLeftRadius: 45,
                                        borderBottomLeftRadius: 45,
                                        backgroundColor: (albumsIndex == 1) ? colors.button : colors.primary
                                    }]}>
                                        <Text style={[styles.profileButtonText, { color: colors.buttonText }]}>Albums</Text>
                                    </Pressable>
                                    <Pressable style={[styles.profileButton,
                                    {
                                        borderTopRightRadius: 45,
                                        borderBottomRightRadius: 45,
                                        backgroundColor: (albumsIndex == 2) ? colors.button : colors.primary
                                    }]}>
                                        <Text style={[styles.profileButtonText, { color: colors.buttonText }]}>Follows</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Text style={[styles.profileName, { color: colors.text, }]}>

                            </Text>
                            <Text style={[styles.profileBio, { color: colors.text, }]} numberOfLines={4}>

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
        <View style={styles.screen}>
            <HeaderBar title={userData.username}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />
            <FlatList
                ListHeaderComponent={
                    <View style={styles.profileBlock}>
                        <View style={styles.profileContainer}>
                            <Image style={styles.profilePicture}
                                source={{ uri: userData.profilePictureURI }}>
                            </Image>
                            <View style={styles.profileButtonContainer}>
                                <Pressable
                                    style={[styles.profileButton,
                                    {
                                        borderTopLeftRadius: 45,
                                        borderBottomLeftRadius: 45,
                                        backgroundColor: (albumsIndex == 1) ? colors.button : colors.primary
                                    }]}
                                    onPress={() => {
                                        if (albumsIndex == 1) {
                                            setAlbumsIndex(0);
                                        }
                                        else {
                                            setAlbumsIndex(1);
                                        }
                                    }}>
                                    <Text style={[styles.profileButtonText, { color: colors.buttonText }]}>Albums</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.profileButton,
                                    {
                                        borderTopRightRadius: 45,
                                        borderBottomRightRadius: 45,
                                        backgroundColor: (albumsIndex == 2) ? colors.button : colors.primary
                                    }]}
                                    onPress={() => {
                                        if (albumsIndex == 2) {
                                            setAlbumsIndex(0);
                                        }
                                        else {
                                            setAlbumsIndex(2);
                                        }
                                    }}>
                                    <Text style={[styles.profileButtonText, { color: colors.buttonText }]}>Follows</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={styles.profileName}>{userData.name}</Text>
                        <Text style={styles.profileBio} numberOfLines={4}>{userData.biography}
                        </Text>
                    </View>
                }
                style={{ marginBottom: 5 }}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={albums}
                renderItem={renderAlbums}
                keyExtractor={item => item.albumId}
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

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.background,
    },
    profileBlock: {
        flexDirection: 'column',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        maxHeight: 230
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: colors.border,
        borderWidth: 2,
    },
    profileName: {
        fontSize: 16,
        color: colors.text,
        fontWeight: 'bold',
        marginTop: 15,
    },
    profileBio: {
        fontSize: 14,
        color: colors.text,
        marginTop: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: 10,
        paddingHorizontal: 20,
        margin: 2
    },
    profileButtonText: {
        fontSize: 14,
        color: colors.buttonText,
    },
    profileButtonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
});

export default ProfileScreen;