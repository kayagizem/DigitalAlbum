import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import WideButton from '../components/WideButton';
import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

import { addUser, signUpFirebase } from '../backend/firebase'

import { useStateValue } from '../StateProvider'

function SignUpScreen({ navigation }) {
    const [state, dispatch] = useStateValue();

    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.screen}>
            <HeaderBar title="Sign Up"
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    keyboardType='email-address'
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <WideButton
                    text='Sign Up'
                    onPress={async () => {
                        const data = {
                            email: email,
                            password: password,
                            username: username,
                            name: name
                        }
                        await signUpFirebase(data);
                        await addUser(data);
                        dispatch({
                            type: 'setUserData',
                            payload: { username: username }
                        })
                    }}
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

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.link,
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
        borderColor: colors.border,
        backgroundColor: colors.input,
        color: colors.text,
    },
});

export default SignUpScreen;