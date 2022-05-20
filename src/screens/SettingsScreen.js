import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';

import { useStateValue } from '../StateProvider'

function SettingsScreen({ route, navigation }) {
    const [state, dispatch] = useStateValue();

    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.screen}>
            <HeaderBar title="Settings"
            />

            <View style={styles.content}>

            </View >
        </View>
    );
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

export default SettingsScreen;