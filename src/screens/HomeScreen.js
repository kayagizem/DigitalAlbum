import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import { useStateValue } from '../StateProvider';

function HomeScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();

    return (
        <View style={styles.screen}>
            <HeaderBar title="Home"
            />
        </View >
    );
}

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.background,
    },
});

export default HomeScreen;