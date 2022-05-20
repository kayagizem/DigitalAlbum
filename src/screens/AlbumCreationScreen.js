import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

import { useStateValue } from '../StateProvider'
import { createAlbum } from '../backend/firebase';

function AlbumCreationScreen({ navigation }) {
    const [state, dispatch] = useStateValue();

    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [name, setName] = useState('');
    const [id, setId] = useState('');

    return (
        <View style={styles.screen}>
            <HeaderBar title="New Album"
                leftButtonText="Back"
                onPressLeft={() => navigation.navigate("User Profile")}
            />

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Album ID'
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    onChangeText={(id) => setId(id)}
                />

                <WideButton
                    text='Create'
                    onPress={async () => {
                        const data = {
                            albumName: name,
                            albumId: id,
                            username: state.userData.username
                        }
                        createAlbum(data);
                        navigation.navigate("User Profile")
                    }} />

                <View style={styles.textContainer}>
                    <Text style={{
                        color: '#666666',
                        marginTop: 10,
                    }}>
                        You are ready to go!
                    </Text>
                </View>
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

export default AlbumCreationScreen;