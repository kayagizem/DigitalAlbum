import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { postImage } from '../backend/firebase';

import { useStateValue } from '../StateProvider'

function PostCreationScreen({ route, navigation }) {
    const [state, dispatch] = useStateValue();

    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [imageURI, setImageURI] = useState(null);
    const [caption, setCaption] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImageURI(result.uri);
        }
    }

    return (
        <View style={styles.screen}>
            <HeaderBar title="Post"
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.content}>

                {imageURI
                    ? <Image source={{ uri: imageURI }} style={{ width: 200, height: 200, marginVertical: 25 }} />
                    : <View />
                }

                <TextInput
                    style={styles.input}
                    placeholder="Caption"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(caption) => setCaption(caption)}
                />

                <WideButton
                    text='Pick Image'
                    onPress={pickImage} />


                <WideButton
                    text='Post'
                    onPress={() => {
                        const data = {
                            albumId: route.params.albumId,
                            username: state.userData.username,
                            caption: caption,
                            imageURI: imageURI
                        }
                        postImage(data)
                        navigation.goBack();
                    }} />
            </View >
        </View>
    );
}

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.link,
        marginTop: 10,
    },
    textContainer: {
        alignItems: 'center'
    },
    input: {
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        paddingLeft: 15,
        borderRadius: 15,
        borderColor: colors.border,
        backgroundColor: colors.input,
        color: colors.text,
    },
});

export default PostCreationScreen;