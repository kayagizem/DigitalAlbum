import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const CommentView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={[styles.container, props.style]}>
            <Pressable onPress={() => props.nav.navigate('Profile', { username: props.username })} >
                <View style={styles.followerContainer}>
                    <Text style={styles.username}>{props.username}</Text>
                </View>
            </Pressable>
            <View style={styles.followerContainer}>
                <Text style={styles.comment}>{props.comment}</Text>
            </View>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor: colors.card
    },
    followerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 45,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text
    },
    comment: {
        fontSize: 13,
        color: colors.text
    }
});

export default CommentView;