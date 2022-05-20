import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import UserStackNavigator from './UserStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';

import { useStateValue } from '../StateProvider';

import { getAuth } from 'firebase/auth';

import { getUserDataByEmail, getUserDataByUsername } from '../backend/firebase';
import SettingsStackNavigator from './SettingsStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

function MainNavigation({ theme }) {
    const [state, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        fetchUserAsync();
    }
    const fetchUserAsync = async () => {
        let userData = {};
        if (state.username != null) {
            userData = await getUserDataByUsername(state.username);
        } else {
            const email = getAuth().currentUser.email;
            userData = await getUserDataByEmail(email);
        }
        dispatch({
            type: 'setUserData',
            payload: userData
        });
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>LOADING</Text>
            </View>
        );
    }
    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator
                initialRouteName="User Stack"
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