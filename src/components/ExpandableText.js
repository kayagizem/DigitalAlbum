import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.production.min';

/*
* Created custom component
* <WideButton title='Sign Up' />
* Components like Sign Up and Log In button.
* It will be tested.
*/

function ExpandableText(props, numberOfLines) {
    return (
        <Text style={props.style}>{props.children}</Text>
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

export default ExpandableText;