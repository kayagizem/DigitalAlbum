import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';

import WideButton from '../components/WideButton';

import styles from '../Style';

function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [authError, setAuthError] = useState(true);

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
            <View style={styles.headerBar}>
                <View style={styles.headerLeftBox}>
                </View>
                <Text style={styles.headerTitle}>Log In</Text>
                <View style={styles.headerRightBox}>
                </View>
            </View>
            <View style={styles.content}>
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
                        onPress={() => navigation.navigate('Profile', { uid: 'testAccount' })}>[TESTING PURPOSE] Go to profile page.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Album Followers')}>[TESTING PURPOSE] Go to Album Followers page.</Text>
                </View>

            </View >
        </View>
    );
}

export default LoginScreen;