import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const GeneralButton = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    if (props.disabled) {
        return (
            <Pressable
                style={[
                    styles.button,
                    {
                        backgroundColor: "#aaaaaa"
                    },
                    props.style
                ]}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </Pressable>
        )
    }

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: pressed ? colors.followButtonPressed : colors.followButton
                },
                props.style
            ]}
            onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>
    )
}

const createStyle = (colors) => StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        width: '40%',
        marginTop: 5,
        marginHorizontal: 2,
    },
    buttonText: {
        fontSize: 16,
        color: colors.followButtonText,
        letterSpacing: 0.25,
    }
});

export default GeneralButton;