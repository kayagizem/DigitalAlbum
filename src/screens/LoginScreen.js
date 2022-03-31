import React, {useState} from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import styles from '../Style';

export default function LoginScreen({ navigation }, props) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSignUp = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
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
                    placeholder='Username or Email'
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
                    onPress={() => onSignUp()}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>

                <View style={styles.textContainer}>
                    <Text style={styles.linkText}>Forgot your password?</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Sign Up')}>Don't have an account? Sign up.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => navigation.navigate('Profile')}>[TESTING PURPOSE] Go to profile page.</Text>
                </View>

            </View >
        </View>
    );
}

