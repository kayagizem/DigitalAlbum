import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const WideButton = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: pressed ? colors.buttonPressed : colors.button
                }
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
        borderRadius: 45,
        backgroundColor: colors.secondary,
        padding: 16,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: colors.buttonText,
        letterSpacing: 0.25,
    }
});

export default WideButton;