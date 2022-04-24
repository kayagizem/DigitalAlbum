import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

function LoginScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [authError, setAuthError] = useState(false);

    const formatData = () => {
        return ({
            username,
            password,
        });
    }

    const renderWarning = () => {
        if (authError) {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#ee3322',
                        margin: 2
                    }}>
                        Wrong username or password.
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.screen}>
            <HeaderBar title="Log In" />

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(password) => setPassword(password)}
                />

                {renderWarning()}

                <WideButton
                    text='Log In'
                    onPress={() => console.log(formatData())} />

                <View style={styles.textContainer}>
                    <Text style={styles.linkText}>Forgot your password?</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Sign Up')}>Don't have an account? Sign up.</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Profile', { username: 'testAccount' })}>[TESTING PURPOSE] Go to profile page.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Album', { albumId: 'testAlbum' })}>[TESTING PURPOSE] Go to Album page.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Album Followers')}>[TESTING PURPOSE] Go to Album Followers page.</Text>
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

export default LoginScreen;