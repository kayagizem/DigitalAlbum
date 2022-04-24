import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '@react-navigation/native';

const AlbumView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={props.style}>
            <Pressable onPress={() => props.nav.navigate('Album', { albumId: props.albumId })} >
                <View style={styles.albumContainer}>
                    <Image style={styles.albumImage}
                        source={{ uri: props.image }}>
                    </Image>
                    <Text style={styles.albumId} numberOfLines={1}>{props.albumId}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const createStyle = (colors) => StyleSheet.create({
    albumContainer: {
        padding: 1,
        backgroundColor: colors.card,
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
        color: colors.text,
        fontWeight: 'bold',
        margin: 4
    }
});

export default AlbumView;