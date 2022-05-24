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
import { useStateValue } from '../StateProvider';

import { getAuth } from 'firebase/auth';

import { getUserDataByEmail, getOwnedAlbums, getContributedAlbums, getFollowedAlbums } from '../backend/firebase';

const Tab = createBottomTabNavigator();

function MainNavigation({ theme }) {
    const [state, dispatch] = useStateValue();

    useEffect(async () => {
        await fetchUserAsync().then((userData) => {
            fetchAlbumsLists(userData.username);
        })
    }, [state.reload]);

    const fetchUserAsync = async () => {
        let userData = await getUserDataByEmail(getAuth().currentUser.email);
        dispatch({
            type: 'setUserData',
            payload: userData
        });
        return userData;
    }

    const fetchAlbumsLists = (username) => {
        fetchAlbumListsAsync(username);
    }

    const fetchAlbumListsAsync = async (username) => {
        let owned = await getOwnedAlbums(username);
        dispatch({
            type: 'setUserOwnedAlbums',
            payload: owned.map((albumData) => albumData.albumId)
        });
        await getContributedAlbums(username)
            .then((albumList) => {
                dispatch({
                    type: 'setUserContributedAlbums',
                    payload: albumList.map((albumData) => albumData.albumId)
                });
            });
        await getFollowedAlbums(username)
            .then((albumList) => {
                dispatch({
                    type: 'setUserFollowedAlbums',
                    payload: albumList.map((albumData) => albumData.albumId)
                });
            });
    }

    return (
        <NavigationContainer theme={theme}>
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
                        } else if (route.name === 'Settings Stack') {
                            let iconName = focused
                                ? 'settings'
                                : 'settings-outline';
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
                <Tab.Screen name="User Stack" component={UserStackNavigator} />
                <Tab.Screen name="Settings Stack" component={SettingsStackNavigator} />
            </Tab.Navigator>
        </NavigationContainer >
    );
}

export default MainNavigation;