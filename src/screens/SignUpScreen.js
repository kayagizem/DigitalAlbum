import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth'

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import globalStyles from '../Style';

function onSignUp(data) {
    const { email, password, name, username } = data
    createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
}

function SignUpScreen({ navigation }) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userExists, setUserExists] = useState(false);

    const formatData = () => {
        return ({
            email,
            password,
            name,
            username,
        });
    }

    const renderWarning = () => {
        if (userExists) {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#ee3322',
                        margin: 2
                    }}>
                        Username already taken
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={globalStyles.screen}>
            <HeaderBar title="Sign Up"
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={globalStyles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType='email-address'
                    onChangeText={(email) => setEmail(email)}
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
                    onPress={() => { console.log(formatData()) }}
                />

                <View style={styles.textContainer}>
                    <Text style={{
                        color: '#666666',
                        marginTop: 10,
                    }}>
                        By signing up, you agree to our <Text style={{ color: '#00A3FF' }}>Terms</Text> and <Text style={{ color: '#00A3FF' }}>Data Policy</Text>.
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.goBack()}>Already have an account? Log in.</Text>
                </View>
            </View>
        </View>
    )
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

export default SignUpScreen;