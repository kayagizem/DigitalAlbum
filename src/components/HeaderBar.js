import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '@react-navigation/native';

/*
    <HeaderBar title="Sign Up"
        leftButtonText="Back"
        onPressLeft = {}
        rightButtonText=""
        onPressRight= {}
    />
*/
const HeaderBar = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const leftButton = props.leftButtonText ?
        (<Pressable style={styles.headerLeftButton}>
            <Text style={styles.headerText} onPress={props.onPressLeft}>{props.leftButtonText}</Text>
        </Pressable>) :
        (<View style={styles.headerLeftButton}></View>);

    const rightButton = props.rightButtonText ?
        (<Pressable style={styles.headerRightButton}>
            <Text style={styles.headerText} onPress={props.onPressRight}>{props.rightButtonText}</Text>
        </Pressable>) :
        (<View style={styles.headerRightButton}></View>);

    const titleStyle = props.isId ? styles.idTitle : styles.headerTitle;

    return (
        <View style={styles.headerBar}>
            {leftButton}
            <View style={styles.titleBox}>
                <Text style={titleStyle} numberOfLines={1}>{props.title}</Text>
            </View>
            {rightButton}
        </View >
    );
}

const createStyle = (colors) => StyleSheet.create({
    headerBar: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: colors.primary,
        height: 80
    },
    headerLeftButton: {
        alignItems: 'flex-start',
        marginTop: 10,
        flex: 2,
    },
    headerRightButton: {
        alignItems: 'flex-end',
        marginTop: 10,
        flex: 2,
    },
    headerText: {
        color: colors.text,
        fontSize: 17,
        fontWeight: 'bold',
    },
    titleBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 6,
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.headerText,
    },
    idTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        textAlignVertical: 'center',
        marginTop: 10
    },
});

export default HeaderBar;