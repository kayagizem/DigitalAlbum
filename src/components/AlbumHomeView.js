import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { getPosts } from '../backend/firebase';

const AlbumHomeView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        await fetchPostsAsync();
    }, []);

    const fetchPostsAsync = async () => {
        await getPosts(props.albumId)
            .then((posts) => {
                posts = posts.sort((a, b) => b.dateCreated - a.dateCreated)
                setPosts(posts);
            });
    }

    const renderImages = ({ item }) => (
        <View>
            <Image style={styles.albumImage} source={{ uri: item.imageURI }} />
        </View>
    );
    return (
        <View style={styles.albumContainer}>
            <FlatList
                style={{ height: Dimensions.get('window').width }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                disableIntervalMomentum={true}
                data={posts}
                renderItem={renderImages}
                keyExtractor={item => item.imageURI}
            />
            <Pressable
                style={{ alignItems: 'center', padding: 5, justifyContent: 'center' }}
                onPress={() => props.nav.navigate('Album', { albumId: props.albumId })} >
                <Text style={styles.albumId} numberOfLines={1}>{props.albumId}</Text>
            </Pressable>
        </View>
    )
}

const createStyle = (colors) => StyleSheet.create({
    albumContainer: {
        padding: 1,
        backgroundColor: colors.card,
        alignItems: 'center',
        marginBottom: 5
    },
    albumImage: {
        width: '100%',
        height: Dimensions.get('window').width,
        aspectRatio: 1,
    },
    albumId: {
        fontSize: 18,
        color: colors.text,
        fontWeight: 'bold',
    }
});

export default AlbumHomeView;