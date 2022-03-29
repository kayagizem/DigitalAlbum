import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';

import styles from '../Style';

function LoginScreen({ navigation }) {
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

export default LoginScreen;