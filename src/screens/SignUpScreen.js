import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth'

import styles from '../Style';
import WideButton from '../components/WideButton';

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
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeftBox}>
                    <Text style={styles.headerText}
                        onPress={() => navigation.goBack()}>Back</Text>
                </View>
                <Text style={styles.headerTitle}>Sign Up</Text>
                <View style={styles.headerRightBox}>
                </View>
            </View>

            <View style={styles.content}>
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
                        onPress={() => props.navigation.goBack()}>Already have an account? Log in.</Text>
                </View>
            </View>
        </View>
    )

}

export default SignUpScreen;