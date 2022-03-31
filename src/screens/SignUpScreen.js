import React,{ useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, } from 'react-native';
import { Alert } from 'react-native-web';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import styles from '../Style';
require('firebase/firestore');



export default function SignUpScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onRegister = () => {
        if (name.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
        firebase.firestore()
            .collection('users')
            .where('username', '==', username)
            .get()
            .then((snapshot) => {

                if (!snapshot.exist) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            if (snapshot.exist) {
                                return
                            }
                            firebase.firestore().collection("users")
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    name,
                                    email,
                                    username,
                                    image: 'default',
                                    followingCount: 0,
                                    followersCount: 0,

                                })
                        })
                        .catch(() => {
                            setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
                        })
                }
            }).catch(() => {
                setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
            })

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
                    placeholder='Name'
                    onChangeText={(name) => setName(name)}

                />
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}

                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={(email) => setEmail(email)}

                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}

                />
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#69CCE2' : '#5AA2B1'
                        }
                    ]}
                    onPress={() => onRegister()}>

                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
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
    );
}

