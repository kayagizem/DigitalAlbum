import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const ImageView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={props.style}>
            <View style={styles.ImageViewContainer}>
                <Image style={styles.albumImage}
                    source={{ uri: props.image }}>
                </Image>
                <View style={styles.commentContainer}>
                    <Text style={styles.authorUsername}
                        onPress={() => props.nav.navigate('Profile', { username: props.author })} >{props.author}</Text>
                    <Text style={styles.comment}>{props.titleComment}</Text>
                </View>
            </View>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    ImageViewContainer: {
        backgroundColor: colors.card,
        alignItems: 'center',
        paddingBottom: 10,
    },
    albumImage: {
        width: '100%',
        aspectRatio: 1,
    },
    commentContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    authorUsername: {
        fontSize: 13,
        color: colors.text,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    comment: {
        fontSize: 13,
        color: colors.text,
        marginLeft: 10
    }
});

export default ImageView;