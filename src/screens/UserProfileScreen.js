import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';

import AlbumView from '../components/AlbumView';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import { useStateValue } from '../StateProvider';

import { onSignOut, getOwnedAlbums, getAlbumData } from '../backend/firebase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function UserProfileScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();
    const [ownedAlbums, setOwnedAlbums] = useState({});

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchAlbums();
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        fetchAlbums();
    }, []);

    function fetchAlbums() {
        fetchAlbumsAsync();
    }
    const fetchAlbumsAsync = async () => {
        const ownedAlbums = await getOwnedAlbums(state.userData.username);
        let ownedAlbumData = []
        for (let i = 0; i < ownedAlbums.length; i++) {
            let data = await getAlbumData(ownedAlbums[i].albumId);
            ownedAlbumData.push(data);
        }
        ownedAlbumData = ownedAlbumData.sort((a, b) => b.dateCreated - a.dateCreated)
        setOwnedAlbums(ownedAlbumData);
    }

    const renderAlbums = ({ item }) => (
        <AlbumView style={{ flex: 1 / 3, margin: 1 }} albumId={item.albumId} albumCoverURI={item.albumCoverURI} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar title={state.userData.username}
                isId
                leftButtonText="Create"
                onPressLeft={() => navigation.navigate("Album Creation")}
                rightButtonText="Settings"
                onPressRight={() => {
                    navigation.navigate("Profile Settings");
                }}
            />

            <View style={styles.profileBlock}>
                <View style={styles.profileContainer}>
                    <Image style={styles.profilePicture}
                        source={{ uri: state.userData.profilePictureURI }}>
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
                <Text style={styles.profileName}>{state.userData.name}</Text>
                <Text style={styles.profileBio} numberOfLines={4}>{state.userData.biography}
                </Text>
            </View>
            <FlatList
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

export default UserProfileScreen;