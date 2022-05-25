import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native';
import { useState } from "react";


const ImageView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const [liked, setLiked] = useState(false);

    return (
        <View style={props.style}>
            <View style={styles.ImageViewContainer}>
                <View style={styles.commentContainer}>
                    <Text style={styles.authorUsername}
                        onPress={() => props.nav.navigate('Profile', { username: props.username })} >{props.username}</Text>
                    <Text style={styles.comment}>{props.caption}</Text>
                </View>
                {props.imageURI != ""
                    ? (
                        <Image style={styles.albumImage}
                            source={{ uri: props.imageURI }}>
                        </Image>
                    ) : (
                        <View style={styles.albumImage}>
                        </View>
                    )
                }
                <View style={styles.likeContainer}>
                    <Pressable
                        onPress={() => { 
                            //let data = {
                            //    albumId: route.params.albumId,
                            //    username: state.userData.username,
                            //    postId: route.params.postId
                            //}
                            //addLikes(data);
                            setLiked((isLiked) => !isLiked)
                            //dispatch({
                            //    type: 'reloadState',
                            //    payload: !state.reload
                            //});
                        }}
                    >
                      <Ionicons
                            style={{ marginRight: 8 }} name={liked ? "heart" : "heart-outline"} size={32} color={liked ? "red" : "black"}
                          />
                    </Pressable>
                    <Pressable
                        onPress={() => { }}
                    >
                        <Ionicons style={{ marginRight: 8 }} name="chatbox-outline" size={32} color="black" />
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    ImageViewContainer: {
        backgroundColor: colors.card,
        alignItems: 'center',
    },
    albumImage: {
        width: '100%',
        aspectRatio: 1,
    },
    likeContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    commentContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 12
    },
    authorUsername: {
        fontSize: 14,
        color: colors.text,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    comment: {
        fontSize: 14,
        color: colors.text,
        marginLeft: 10
    }
});

export default ImageView;