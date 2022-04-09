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
                <Image style={styles.albumCover}
                    source={{ uri: props.image }}>
                </Image>
                <Text style={styles.albumId}>{props.aid}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    albumContainer: {
        padding: 10,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        borderRadius: 10,
    },
    albumCover: {
        width: 145,
        height: 145,
        borderRadius: 10
    },
    albumId: {
        fontSize: 14,
        color: '#073D48',
        fontWeight: 'bold',
        marginTop: 5,
    }
});

export default AlbumView;