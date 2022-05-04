import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import HeaderBar from '../components/HeaderBar';

function SearchScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [input, setInput] = useState('');

    return (
        <View style={styles.screen}>
            <HeaderBar
                title="Search"
            />

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Search'
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    onChangeText={(input) => setInput(input)}
                />

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

export default SearchScreen;