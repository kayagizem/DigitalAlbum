import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';

import styles from '../Style';

function SignUpScreen({ navigation }) {
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

export default SignUpScreen;