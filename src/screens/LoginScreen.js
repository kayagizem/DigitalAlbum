import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert } from 'react-native-web';

function LoginScreen() {
    return (
        <View style={styles.screen}>
            <View style={styles.topBar}><Text style={styles.screenTitle}>Log In</Text></View>
            <TextInput
                style={styles.input}
                placeholder='Username or Email'
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
            <Pressable style={styles.textContainer}>
                <Text style={styles.linkText}>Don't have an account? Sign up.</Text>
            </Pressable>
        </View >
    );
}

const styles = StyleSheet.create({
    topBar: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginBottom: 20,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 5,
        flex: 1,
    },
    backText: {
        color: '#073D48',
        fontSize: 17,
    },
    textContainer: {
        alignItems: 'center',
        paddingTop: 12,
        paddingHorizontal: 15,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5AA2B1',
    },
    screenTitle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 6,
    },
    screen: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        alignContent: 'center',
    },
    input: {
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        borderColor: '#cfcfcf',
        backgroundColor: '#efefef',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#5AA2B1',
        padding: 16,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        letterSpacing: 0.25,
    },
});

export default LoginScreen;