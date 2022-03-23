import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';

import styles from '../Style';

function LoginScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <Pressable style={styles.headerLeftBox}>
                </Pressable>
                <Text style={styles.headerTitle}>Log In</Text>
                <Pressable style={styles.headerRightBox}>
                </Pressable>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Username or Email'
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#69CCE2' : '#5AA2B1'
                        }
                    ]}
                    onPress={() => Alert.alert('Button Pressed.')}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <Pressable style={styles.textContainer}>
                    <Text style={styles.linkText}>Forgot your password?</Text>
                </Pressable>
                <Pressable style={styles.textContainer}
                    onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.linkText}>Don't have an account? Sign up.</Text>
                </Pressable>
                <Pressable style={styles.textContainer}
                    onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.linkText}>[TESTING PURPOSE] Go to profile page.</Text>
                </Pressable>
            </View >
        </View>
    );
}

export default LoginScreen;