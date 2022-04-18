import React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from '../Style';

import FollowerView from '../components/FollowerView';

const testData = [
    {
        uid: 'emre1',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre2',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre3',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre4',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre5',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre6',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre7',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre8',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre9',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre10',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre11',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre12',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre13',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre14',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre15',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre16',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre17',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre18',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre19',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre20',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        uid: 'emre21',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
];

function AlbumFollowerScreen({ navigation }) {

    const renderItem = ({ item }) => (
        <FollowerView style={{ marginVertical: 4 }} uid={item.uid} image={item.image} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeftBox}>
                    <Text style={styles.headerText}
                        onPress={() => navigation.goBack()}>Back</Text>
                </View>
                <Text style={styles.profileId}>Followers</Text>
                <View style={styles.headerRightBox} />
            </View>
            <View style={styles.content}>
                <FlatList
                    data={testData}
                    renderItem={renderItem}
                    keyExtractor={item => item.uid}
                />
            </View >
        </View>
    );
}

export default AlbumFollowerScreen;