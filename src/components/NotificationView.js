import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { addContributor, addFollower, deleteNotification, getAlbumData, getUserDataByUsername } from '../backend/firebase';

import { useStateValue } from '../StateProvider';

import { Ionicons } from '@expo/vector-icons';

const UserView = (props) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();

    return (
        <View style={styles.followerContainer}>
            <Text style={styles.username}>{props.from} wants to {props.type == "follow" ? "follow" : "contribute"} {props.albumId}</Text>
            <View style={styles.followerContainer2}>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        let data = {
                            albumId: props.albumId,
                            username: props.from,
                        };
                        if (props.type == "follow") {
                            addFollower(data);
                            deleteNotification(props.notificationId);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }
                        else if (props.type == "contribute") {
                            addContributor(data);
                            deleteNotification(props.notificationId);
                            dispatch({
                                type: 'reloadState',
                                payload: !state.reload
                            });
                        }
                    }}
                >
                    <Ionicons name="checkmark-sharp" size={36} color={colors.primary} />
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        deleteNotification(props.notificationId);
                    }}
                >
                    <Ionicons name="close-sharp" size={36} color={colors.primary} />
                </Pressable>
            </View>
        </View >
    )
}

const createStyle = (colors) => StyleSheet.create({
    followerContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: colors.card,
        alignItems: 'center',
    },
    followerContainer2: {
        padding: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: colors.card,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
        color: colors.text
    },
    button: {
        padding: 6,
        borderRadius: 15,
    },
});

export default UserView;