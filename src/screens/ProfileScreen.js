import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, RefreshControl } from 'react-native';

import AlbumView from '../components/AlbumView';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

import { getOwnedAlbums, getAlbumData, getUserDataByUsername } from '../backend/firebase';

function ProfileScreen({ route, navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [userData, setUserData] = useState({});
    const [ownedAlbums, setOwnedAlbums] = useState([]);

    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchUserAsync().then(setRefreshing(false));
    }, []);

    useEffect(async () => {
        setRefreshing(true);
        await fetchUserAsync().then(setRefreshing(false));
    }, []);

    const fetchUserAsync = async () => {
        await getUserDataByUsername(route.params.username)
            .then(async (userData) => {
                setUserData(userData)
                let ownedAlbumData = [];
                await getOwnedAlbums(userData.username)
                    .then(async (ownedAlbums) => {
                        for (let i = 0; i < ownedAlbums.length; i++) {
                            await getAlbumData(ownedAlbums[i].albumId)
                                .then((data) => {
                                    ownedAlbumData.push(data);
                                });
                        }
                    })
                    .finally(() => {
                        ownedAlbumData = ownedAlbumData.sort((a, b) => b.dateCreated - a.dateCreated)
                        setOwnedAlbums(ownedAlbumData);
                    });
            });
    }


    const renderAlbums = ({ item }) => (
        <AlbumView style={{ flex: 1 / 3, margin: 1 }} albumId={item.albumId} albumCoverURI={item.albumCoverURI} nav={navigation} />
    );

    if (refreshing) {
        return (<View></View>)
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
                                <View style={[styles.profileButton,
                                {
                                    borderTopLeftRadius: 45,
                                    borderBottomLeftRadius: 45
                                }]}>
                                    <Text style={styles.profileButtonText}>Albums</Text>
                                </View>
                                <View style={[styles.profileButton,
                                {
                                    borderTopRightRadius: 45,
                                    borderBottomRightRadius: 45
                                }]}>
                                    <Text style={styles.profileButtonText}>Follows</Text>
                                </View>
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
                data={ownedAlbums}
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