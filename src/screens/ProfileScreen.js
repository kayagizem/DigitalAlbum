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
    const [ownedAlbums, setOwnedAlbums] = useState([]);
    const [contributedAlbums, setContributedAlbums] = useState([]);
    const [followedAlbums, setFollowedAlbums] = useState([]);

    const [albumsIndex, setAlbumsIndex] = useState(0);

    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchUserAsync()
            .then(() => {
                switch (albumsIndex) {
                    case 1:
                        setAlbums(contributedAlbums);
                        break;
                    case 2:
                        setAlbums(followedAlbums);
                        break;
                    default:
                        setAlbums(ownedAlbums);
                        break;
                }
            })
            .finally(() => { setRefreshing(false) });
    }, []);

    useEffect(async () => {
        setRefreshing(true);
        await fetchUserAsync()
            .then(() => {
                switch (albumsIndex) {
                    case 1:
                        setAlbums(contributedAlbums);
                        break;
                    case 2:
                        setAlbums(followedAlbums);
                        break;
                    default:
                        setAlbums(ownedAlbums);
                        break;
                }
            })
            .finally(() => { setRefreshing(false); });
    }, [albumsIndex]);

    const fetchUserAsync = async () => {
        await getUserDataByUsername(route.params.username)
            .then(async (userData) => {
                setUserData(userData)
                fetchUserAlbumsAsync(route.params.username);
            });
    }

    const fetchUserAlbumsAsync = async (username) => {
        await getOwnedAlbums(username)
            .then((albumList) => {
                setOwnedAlbums(albumList);
            });
        await getContributedAlbums(username)
            .then((albumList) => {
                setContributedAlbums(albumList);
            });
        await getFollowedAlbums(username)
            .then((albumList) => {
                setFollowedAlbums(albumList);
            });
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