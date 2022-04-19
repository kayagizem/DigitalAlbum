import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import globalStyles from '../Style';

import HeaderBar from '../components/HeaderBar';
import ImageView from '../components/ImageView';

const testData = [
    {
        author: 'test_user1',
        titleComment: 'naber',
        imageId: 'primat_musicians',
        image: 'https://cdn.pixabay.com/photo/2018/06/30/09/29/monkey-3507317_960_720.jpg'
    },
    {
        imageId: 'holiday',
        image: 'https://cdn.pixabay.com/photo/2017/06/11/00/52/molokaii-2391242_960_720.jpg'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/11/14/22/18/beach-1824855_960_720.jpg',
        imageId: 'digitalalbumholiday3423412'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre1'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre2'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre3'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre4'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre5'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre6'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre7'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre8'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tigers-591359_960_720.jpg',
        imageId: 'tigers.of.emre9'
    },
];

function AlbumScreen({ route, navigation }) {
    const albumId = route.params.albumId;

    const albumData = {
        name: 'Test Album Name',
        images: testData
    };

    const renderImages = ({ item }) => (
        <ImageView style={{ flex: 1 / 3, margin: 1 }} imageId={item.imageId} image={item.image} author={item.author} titleComment={item.titleComment} nav={navigation} />
    );

    return (
        <View style={globalStyles.screen}>
            <HeaderBar title={albumId}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
                rightButtonText="Settings"
            />

            <View style={styles.albumBlock}>
                <Text style={styles.albumName}>{albumData.name}</Text>
                <View style={styles.albumButtonContainer}>
                    <View style={[styles.albumButton,
                    {
                        borderTopLeftRadius: 45,
                        borderBottomLeftRadius: 45
                    }]}>
                        <Text style={styles.albumButtonText}>Owners</Text>
                    </View>
                    <View style={[styles.albumButton,
                    {
                        borderTopRightRadius: 45,
                        borderBottomRightRadius: 45
                    }]}>
                        <Text style={styles.albumButtonText}>Followers</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={{ marginBottom: 5 }}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                data={albumData.images}
                renderItem={renderImages}
                keyExtractor={item => item.imageId}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    albumBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#073D48',
        maxHeight: 230
    },
    albumName: {
        fontSize: 18,
        color: '#073D48',
        fontWeight: 'bold',
    },
    albumButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    albumButtonText: {
        fontSize: 14,
        color: '#ffffff',
    },
    albumButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#073D48',
        padding: 10,
        paddingHorizontal: 20,
        margin: 2,
    },
    albumButtonText: {
        fontSize: 14,
        color: '#ffffff',
    },
});

export default AlbumScreen;