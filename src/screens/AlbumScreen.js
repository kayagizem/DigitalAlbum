import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import HeaderBar from '../components/HeaderBar';
import ImageView from '../components/ImageView';

import { getAlbumData, getPosts } from '../backend/firebase'

function AlbumScreen({ route, navigation }) {
    const [albumData, setAlbumData] = useState('');
    const [posts, setPosts] = useState({});

    const { colors } = useTheme();
    const styles = createStyle(colors);

    const albumId = route.params.albumId;

    useEffect(() => {
        fetchAlbumData();
        fetchPosts();
    }, []);

    function fetchAlbumData() {
        fetchAlbumDataAsync();
    }
    const fetchAlbumDataAsync = async () => {
        const albumData = await getAlbumData(albumId);
        setAlbumData(albumData);
    }

    function fetchPosts() {
        fetchPostsAsync();
    }
    const fetchPostsAsync = async () => {
        const posts = await getPosts(albumId);
        setPosts(posts);
    }

    const renderImages = ({ item }) => (
        <ImageView style={{ flex: 1 / 3, margin: 1 }} imageURI={item.imageURI} username={item.username} caption={item.caption} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar title={albumId}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
                rightButtonText="Post"
                onPressRight={() => navigation.navigate("Post Creation", { albumId: albumId })}
            />

            <View style={styles.albumBlock}>
                <Text style={styles.albumName}>{albumData.albumName}</Text>
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
                data={posts}
                renderItem={renderImages}
                keyExtractor={item => item.imageURI}
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
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    albumBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        maxHeight: 230
    },
    albumName: {
        fontSize: 18,
        color: colors.text,
        fontWeight: 'bold',
    },
    albumButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    albumButtonText: {
        fontSize: 14,
        color: colors.buttonText,
    },
    albumButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: 10,
        paddingHorizontal: 20,
        margin: 2,
    },
});

export default AlbumScreen;