import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import { useStateValue } from '../StateProvider';

import NotificationView from '../components/NotificationView';

import { getNotifications } from '../backend/firebase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function NotificationScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();

    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        dispatch({
            type: 'setNotifications',
            payload: await getNotifications(state.userData.username)
        });
        setRefreshing(false);
    }, []);

    useEffect(async () => {
        setRefreshing(false);
    }, []);

    const renderItems = ({ item }) => {
        return (
            <NotificationView
                from={item.from}
                albumId={item.albumId}
                notificationId={item.notificationId}
                type={item.type}
                nav={navigation}
            />
        )
    };

    if (refreshing) {
        return (
            <View style={styles.screen}>
                <HeaderBar title="Notifications"
                />
            </View>
        );
    }
    return (
        <View style={styles.screen}>
            <HeaderBar title="Notifications"
            />
            <FlatList
                data={state.notifications}
                renderItem={renderItems}
                keyExtractor={item => item.notificationId}
                refreshControl={
                    < RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
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

export default NotificationScreen;