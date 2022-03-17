import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, TextInput } from 'react-native';
import { Alert } from 'react-native-web';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

function SignUpScreen() {
    return (
        <View style={styles.screen}>
            <View style={styles.topBar}><Text style={styles.screenName}>Sign Up</Text></View>
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
        </View >
    );
}

const styles = StyleSheet.create({
    topBar: {
        padding: 10,
        marginBottom: 20,
        marginTop: 5,
    },
    screenName: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
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
    }
});

export default SignUpScreen;