import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

/*
* Created custom component
* <WideButton title='Sign Up' />
* Components like Sign Up and Log In button.
* It will be tested.
*/

function WideButton(props) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: pressed ? '#69CCE2' : '#5AA2B1'
                }
            ]}
            onPress={() => Alert.alert('Button Pressed.')}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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

export default WideButton;