import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

/*
* Created custom component
* <WideButton title='Sign Up' />
* Components like Sign Up and Log In button.
* It will be tested.
*/

function AlbumView(props) {
    return (
        <View style={props.style}>
            <View style={styles.albumContainer}>
                <Image style={styles.albumImage}
                    source={{ uri: props.image }}>
                </Image>
                <Text style={styles.albumId} numberOfLines={1}>{props.aid}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    albumContainer: {
        padding: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        borderRadius: 2
    },
    albumImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 2
    },
    albumId: {
        fontSize: 12,
        color: '#073D48',
        fontWeight: 'bold',
        margin: 4
    }
});

export default AlbumView;