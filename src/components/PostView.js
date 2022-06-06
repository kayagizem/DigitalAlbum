import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native';

import { useStateValue } from '../StateProvider';

import { addLike, getCommentCount, getLikeCount, isLiked, removeLike } from '../backend/firebase';

const PostView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(async () => {
        let liked = await isLiked(state.userData.username, props.postId);
        let likeCount = await getLikeCount(props.postId);
        let commentCount = await getCommentCount(props.postId);
        setLiked(liked);
        setLikeCount(likeCount);
        setCommentCount(commentCount);
    }, []);

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
                    <View style={styles.likeBoxLeft}>
                        <Pressable
                            onPress={() => {
                                if (liked) {
                                    removeLike(state.userData.username, props.postId);
                                    setLiked(false);
                                    setLikeCount(likeCount - 1);
                                }
                                else {
                                    let data = {
                                        username: state.userData.username,
                                        postId: props.postId
                                    }
                                    addLike(data);
                                    setLiked(true);
                                    setLikeCount(likeCount + 1);
                                }
                            }}
                        >
                            {liked
                                ? <Ionicons style={{ marginRight: 12 }} name="heart" size={32} color="red" />
                                : <Ionicons style={{ marginRight: 12 }} name="heart-outline" size={32} color={colors.likeBar} />
                            }
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                props.nav.navigate("Comment", {
                                    postId: props.postId
                                });
                            }}
                        >
                            <Ionicons style={{ marginRight: 12 }} name="chatbox-outline" size={32} color={colors.likeBar} />
                        </Pressable>
                    </View>
                    <View style={styles.likeBoxRight}>
                        <Text style={{ marginRight: 8, color: colors.text }}>{likeCount} likes</Text>
                        <Text style={{ marginRight: 8, color: colors.text }}>{commentCount} comments</Text>
                    </View>
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
        alignItems: 'center'
    },
    likeBoxLeft: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start'
    },
    likeBoxRight: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
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

export default PostView;