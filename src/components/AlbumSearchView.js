import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const AlbumSearchView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={props.style}>
            <Pressable onPress={() => props.nav.navigate('Album', { albumId: props.albumId })} >
                <View style={styles.albumContainer}>
                    {props.albumCoverURI != ""
                        ? (
                            <Image style={styles.albumCover}
                                source={{ uri: props.albumCoverURI }}>
                            </Image>
                        ) : (
                            <View style={styles.albumCover}>
                            </View>
                        )
                    }
                    <Text style={styles.albumId}>{props.albumId}</Text>
                </View>
            </Pressable>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    albumContainer: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.card
    },
    albumCover: {
        width: 50,
        height: 50,
        borderRadius: 45,
    },
    albumId: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
        color: colors.text
    }
});

export default AlbumSearchView;