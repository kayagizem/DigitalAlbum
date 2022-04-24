import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import AlbumView from '../components/AlbumView';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

const testData = [
    {
        albumId: 'primat_musicians',
        image: 'https://cdn.pixabay.com/photo/2018/06/30/09/29/monkey-3507317_960_720.jpg'
    },
    {
        albumId: 'holiday',
        image: 'https://cdn.pixabay.com/photo/2017/06/11/00/52/molokaii-2391242_960_720.jpg'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_960_720.jpg',
        albumId: 'digitalalbumholiday3423412'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        albumId: 'tigers.of.emre'
    },
];

function ProfileScreen({ route, navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const username = route.params.username;

    const userData = {
        profilePictureURI: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg',
        name: 'Test User',
        biography: 'Test biography',
        albums: testData
    };

    const renderAlbums = ({ item }) => (
        <AlbumView style={{ flex: 1 / 3, margin: 1 }} albumId={item.albumId} image={item.image} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar title={username}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

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
            <FlatList
                style={{ marginBottom: 5 }}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={userData.albums}
                renderItem={renderAlbums}
                keyExtractor={item => item.albumId}
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