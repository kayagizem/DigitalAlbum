import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const UserView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={props.style}>
            <Pressable onPress={() => props.nav.navigate('Profile', { username: props.username })} >
                <View style={styles.followerContainer}>
                    {props.profilePictureURI != ""
                        ? (
                            <Image style={styles.profilePicture}
                                source={{ uri: props.profilePictureURI }}>
                            </Image>
                        ) : (
                            <View style={styles.profilePicture}>
                            </View>
                        )
                    }
                    <Text style={styles.username}>{props.username}</Text>
                </View>
            </Pressable>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    followerContainer: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.card
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 45,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
        color: colors.text
    }
});

export default UserView;