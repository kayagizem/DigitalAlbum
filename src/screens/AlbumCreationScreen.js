import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

import { useStateValue } from '../StateProvider'
import { createAlbum } from '../backend/firebase';

import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

function AlbumCreationScreen({ navigation }) {
    const [state, dispatch] = useStateValue();

    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const [albumType, setAlbumType] = useState(1);

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

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setAlbumType(0);
                        }}
                    >
                        <MaterialIcons name="public" size={36} color={albumType == 0 ? colors.primary : colors.secondary} />
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setAlbumType(1);
                        }}
                    >
                        <Feather name="users" size={36} color={albumType == 1 ? colors.primary : colors.secondary} />
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setAlbumType(2);
                        }}
                    >
                        <Ionicons name="lock-closed-outline" size={36} color={albumType == 2 ? colors.primary : colors.secondary} />
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setAlbumType(3);
                        }}
                    >
                        <Ionicons name="eye-off-outline" size={36} color={albumType == 3 ? colors.primary : colors.secondary} />
                    </Pressable>

                </View>

                <WideButton
                    text='Create'
                    onPress={async () => {
                        const data = {
                            albumName: name,
                            albumType: albumType, // 0: general, 1: public, 2: private, 3: secret
                            albumId: id,
                            username: state.userData.username
                        }
                        createAlbum(data);
                        dispatch({
                            type: 'reloadState',
                            payload: !state.reload
                        });
                        navigation.navigate("User Profile");
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
        </View >
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
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        padding: 6,
        borderRadius: 15,
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