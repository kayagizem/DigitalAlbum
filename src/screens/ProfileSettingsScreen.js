import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, Pressable } from 'react-native';

import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { setBiography, setProfilePicture, onSignOut } from '../backend/firebase';

import { useStateValue } from '../StateProvider'
import { TextInput } from 'react-native-gesture-handler';
import { darkTheme, defaultTheme, greenTheme } from '../Themes';

function ProfileSettingsScreen({ navigation }) {
    const [state, dispatch] = useStateValue();

    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [imageURI, setImageURI] = useState(null);
    const [bio, setBio] = useState(state.userData.biography);

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
            <HeaderBar title={state.userData.username}
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.settingsBlock}>
                        <Text style={styles.settingsTitle}>Profile Picture</Text>
                        {imageURI
                            ? <Image source={{ uri: imageURI }} style={styles.profilePictureBlock} />
                            : <View style={styles.profilePictureBlock} />
                        }
                        <View style={styles.profileButtonContainer}>
                            <Pressable style={styles.profileButton}
                                onPress={pickImage}>
                                <Text style={styles.profileButtonText}>Pick Profile Picture</Text>
                            </Pressable>
                            <Pressable style={styles.profileButton}
                                onPress={() => {
                                    const data = {
                                        username: state.userData.username,
                                        imageURI: imageURI
                                    }
                                    setProfilePicture(data);
                                    dispatch({
                                        type: 'reloadState',
                                        payload: !state.reload
                                    });
                                }}>
                                <Text style={styles.profileButtonText}>Set Profile Picture</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.settingsBlock}>
                        <Text style={styles.settingsTitle}>Biography</Text>
                        <TextInput
                            style={styles.settingsInput}
                            placeholder='Biography'
                            placeholderTextColor={colors.placeholder}
                            autoCapitalize="none"
                            multiline={true}
                            onChangeText={(bio) => setBio(bio)}
                        />
                        <View style={styles.profileButtonContainer}>
                            <Pressable style={styles.profileButton}
                                onPress={() => {
                                    let data = {
                                        username: state.userData.username,
                                        biography: bio
                                    }
                                    setBiography(data);
                                    dispatch({
                                        type: 'reloadState',
                                        payload: !state.reload
                                    });
                                }}>
                                <Text style={styles.profileButtonText}>Set Biography</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.settingsBlock}>
                        <Text style={styles.settingsTitle}>Theme</Text>

                        <View style={styles.profileButtonContainer}>
                            <Pressable style={styles.profileButton}
                                onPress={() => {
                                    dispatch({
                                        type: 'setTheme',
                                        payload: defaultTheme
                                    });
                                    dispatch({
                                        type: 'reloadState',
                                        payload: !state.reload
                                    });
                                }}>
                                <Text style={styles.profileButtonText}>Default Theme</Text>
                            </Pressable>
                        </View>
                        <View style={styles.profileButtonContainer}>
                            <Pressable style={styles.profileButton}
                                onPress={() => {
                                    dispatch({
                                        type: 'setTheme',
                                        payload: darkTheme
                                    });
                                    dispatch({
                                        type: 'reloadState',
                                        payload: !state.reload
                                    });
                                }}>
                                <Text style={styles.profileButtonText}>Dark Theme</Text>
                            </Pressable>
                        </View>
                        <View style={styles.profileButtonContainer}>
                            <Pressable style={styles.profileButton}
                                onPress={() => {
                                    dispatch({
                                        type: 'setTheme',
                                        payload: greenTheme
                                    });
                                    dispatch({
                                        type: 'reloadState',
                                        payload: !state.reload
                                    });
                                }}>
                                <Text style={styles.profileButtonText}>Green Theme</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.settingsBlock}>
                        <View style={styles.profileButtonContainer}>
                            <Pressable style={styles.profileButton}
                                onPress={() => {
                                    onSignOut();
                                    dispatch({
                                        type: 'setUserData',
                                        payload: {}
                                    });
                                }}>
                                <Text style={styles.profileButtonText}>Sign Out</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
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
        paddingBottom: 100
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    settingsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
        color: colors.text
    },
    settingsInput: {
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        borderColor: colors.border,
        backgroundColor: colors.input,
        width: '100%',
        height: 100,
        color: colors.text,
    },
    settingsBlock: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        alignItems: 'center'
    },
    profilePictureBlock: {
        width: 300,
        height: 200,
        marginVertical: 10,
        backgroundColor: 'grey',
        alignContent: 'center'
    },
    profileButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    profileButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: 10,
        paddingHorizontal: 20,
        margin: 2,
        width: '100%',
        flex: 1
    },
    profileButtonText: {
        fontSize: 14,
        color: colors.buttonText,
    },
});

export default ProfileSettingsScreen;