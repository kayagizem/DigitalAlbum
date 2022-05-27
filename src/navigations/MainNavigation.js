import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import UserStackNavigator from './UserStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import NotificationStackNavigator from './NotificationStackNavigator';

import { useStateValue } from '../StateProvider';

import { getAuth } from 'firebase/auth';

import { getUserDataByEmail, getOwnedAlbums, getContributedAlbums, getFollowedAlbums, getNotifications } from '../backend/firebase';

const Tab = createBottomTabNavigator();

function MainNavigation() {
    const [state, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        let userData = await fetchUser();
        await fetchAlbumLists(userData.username);
        await fetchNotifications(userData.username);
        setLoading(false);
    }, [state.reload]);

    const fetchUser = async () => {
        let userData = await getUserDataByEmail(getAuth().currentUser.email);
        dispatch({
            type: 'setUserData',
            payload: userData
        });
        return userData;
    }

    const fetchAlbumLists = async (username) => {
        let owned = await getOwnedAlbums(username);
        dispatch({
            type: 'setUserOwnedAlbums',
            payload: owned.map((albumData) => albumData.albumId)
        });
        let contributed = await getContributedAlbums(username);
        dispatch({
            type: 'setUserContributedAlbums',
            payload: contributed.map((albumData) => albumData.albumId)
        });
        let followed = await getFollowedAlbums(username);
        dispatch({
            type: 'setUserFollowedAlbums',
            payload: followed.map((albumData) => albumData.albumId)
        });
    }

    const fetchNotifications = async (username) => {
        let notifications = await getNotifications(username);
        dispatch({
            type: 'setNotifications',
            payload: notifications
        });
    }
    console.log(state)
    if (loading) {
        return (
            <View></View>
        );
    }
    return (
        <NavigationContainer theme={state.theme}>
            <Tab.Navigator
                initialRouteName="Home Stack"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let icon;

                        if (route.name === 'User Stack') {
                            let iconName = focused
                                ? 'person'
                                : 'person-outline';
                            icon = <Ionicons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Search Stack') {
                            let iconName = focused
                                ? 'search'
                                : 'search-outline';
                            icon = <Ionicons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Notification Stack') {
                            let iconName = focused
                                ? 'notifications'
                                : 'notifications-outline';
                            icon = <Ionicons name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Home Stack') {
                            let iconName = focused
                                ? 'home'
                                : 'home-outline';
                            icon = <Ionicons name={iconName} size={size} color={color} />;
                        }

                        return icon;
                    },
                    headerShown: false,
                    animation: 'fade',
                    tabBarShowLabel: false
                })}>
                <Tab.Screen name="Home Stack" component={HomeStackNavigator} />
                <Tab.Screen name="Search Stack" component={SearchStackNavigator} />
                <Tab.Screen name="Notification Stack" component={NotificationStackNavigator} />
                <Tab.Screen name="User Stack" component={UserStackNavigator} />
            </Tab.Navigator>
        </NavigationContainer >
    );
}

export default MainNavigation;