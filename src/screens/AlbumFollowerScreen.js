import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import FollowerView from '../components/FollowerView';

import { useTheme } from '@react-navigation/native';

const testData = [
    {
        username: 'emre1',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre2',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre3',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre4',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre5',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre6',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre7',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre8',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre9',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre10',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre11',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre12',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre13',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre14',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre15',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre16',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre17',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre18',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre19',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre20',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
    {
        username: 'emre21',
        image: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg'
    },
];

function AlbumFollowerScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const renderItem = ({ item }) => (
        <FollowerView style={{ marginVertical: 4 }} username={item.username} image={item.image} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar title="Followers"
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={testData}
                    renderItem={renderItem}
                    keyExtractor={item => item.username}
                />
            </View >
        </View>
    );
}

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.backgroundColor,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
});

export default AlbumFollowerScreen;