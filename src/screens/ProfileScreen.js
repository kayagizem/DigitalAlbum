import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import AlbumView from '../components/AlbumView';

import styles from '../Style';

const testData = [
    {
        aid: 'primat_musicians',
        image: 'https://cdn.pixabay.com/photo/2018/06/30/09/29/monkey-3507317_960_720.jpg'
    },
    {
        aid: 'holiday',
        image: 'https://cdn.pixabay.com/photo/2017/06/11/00/52/molokaii-2391242_960_720.jpg'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_960_720.jpg',
        aid: 'digitalalbumholiday3423412'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        aid: 'tigers.of.emre'
    },
];

function ProfileScreen({ route, navigation }) {
    const { uid } = route.params;

    const profilePictureURI = 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg';

    const renderAlbums = ({ item }) => (
        <AlbumView style={{ flex: 1 / 3, margin: 1 }} aid={item.aid} image={item.image} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeftBox}>
                    <Text style={styles.headerText}
                        onPress={() => navigation.goBack()}>Back</Text>
                </View>
                <Text style={styles.profileId}>{uid}</Text>
                <View style={styles.headerRightBox}>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.profileBlock}>
                <View style={styles.profileContainer}>
                    <Image style={styles.profilePicture}
                        source={{ uri: profilePictureURI }}>
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
                <Text style={styles.profileName}>Guitarist</Text>
                <Text style={styles.profileBio} numberOfLines={4}>Test photo is taken from Firmbee.{'\n'}My albums are awesome.
                </Text>
            </View>
            <FlatList
                style={{ margin: 5 }}
                numColumns={3}
                data={testData}
                renderItem={renderAlbums}
                keyExtractor={item => item.aid}
            />
        </View >
    );
}

export default ProfileScreen;