import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, FlatList, RefreshControl,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native';

import { useStateValue } from '../StateProvider';

import { addLike, isLiked, removeLike } from '../backend/firebase';


import HeaderBar from '../components/HeaderBar';

import GeneralButton from '../components/GeneralButton';


import { followAlbum, contributeAlbum, getAlbumData, getPosts, uncontribute, unfollow } from '../backend/firebase';

const PostView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [commentCount, setCommentCount] = useState(0);
   // const albumIdd = state.alb

    useEffect(async () => {
        let liked = await isLiked(state.userData.username, props.postId);
        //let albumId = await getIdFromWhere("albums", "albumId", data.albumId);
        setLiked(liked);
    }, []);
    
    console.log("this " + props.albumId);
    return (
        <View style={props.style}>
            <View style={styles.ImageViewContainer}>
                <View style={styles.commentContainer}>
                    <Text style={styles.authorUsername}
                        onPress={() => props.nav.navigate('Profile', { username: props.username })} >{props.username}</Text>
                    <Text style={styles.comment}>{props.caption}</Text>
                </View>
                
                {props.imageURI != "" && (state.userContributedAlbums.includes(props.albumId) || state.userOwnedAlbums.includes(props.albumId))
                    ? (
                        <Image style={styles.albumImage}
                            source={{ uri: props.imageURI }}>
                        </Image>
                    ) : (
                        <Image style={styles.albumImage}>
                        </Image>
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
                            onPress={() => { }}
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
    },
    albumId: {
        fontSize: 12,
        color: colors.text,
        fontWeight: 'bold',
        margin: 4
    }
});

export default PostView;