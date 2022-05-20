import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const FollowerView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={props.style}>
            <Pressable onPress={() => props.nav.navigate('Profile', { username: props.username })} >
                <View style={styles.followerContainer}>
                    <Image style={styles.profilePicture}
                        source={{ uri: props.profilePictureURI }}>
                    </Image>
                    <Text style={styles.username}>{props.username}</Text>
                </View>
            </Pressable>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    followerContainer: {
        padding: 10,
        backgroundColor: colors.card,
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
        color: colors.text,
        fontWeight: 'bold',
        marginLeft: 15
    }
});

export default FollowerView;