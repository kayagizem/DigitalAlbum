import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';

import styles from '../Style';

function SignUpScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <Pressable style={styles.headerLeftBox}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>Back</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Sign Up</Text>
                <Pressable style={styles.headerRightBox}>
                </Pressable>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
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
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={{ color: '#666666' }}>
                        By signing up, you agree to our <Text style={{ color: '#00A3FF' }}>Terms</Text> and <Text style={{ color: '#00A3FF' }}>Data Policy</Text>.
                    </Text>
                </View>
                <Pressable style={styles.textContainer}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Already have an account? Log in.</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default SignUpScreen;