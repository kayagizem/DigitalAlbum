import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import globalStyles from '../Style';

function LoginScreen({ navigation }) {

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
        <View style={globalStyles.screen}>
            <HeaderBar title="Log In" />

            <View style={globalStyles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
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

const styles = StyleSheet.create({
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5AA2B1',
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
        borderColor: '#cfcfcf',
        backgroundColor: '#efefef',
    },
});

export default LoginScreen;