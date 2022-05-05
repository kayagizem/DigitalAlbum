import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import UserStackNavigator from './UserStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';

import { useStateValue } from '../StateProvider';

import { getAuth } from 'firebase/auth';

import { getUserDataByEmail, getUserDataByUsername } from '../backend/firebase';

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
                initialRouteName="User"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let icon;

                        if (route.name === 'User') {
                            let iconName = focused
                                ? 'user-circle-o'
                                : 'user-circle';
                            icon = <FontAwesome name={iconName} size={size} color={color} />;
                        } else if (route.name === 'Search') {
                            let iconName = focused
                                ? 'search'
                                : 'search';
                            icon = <Ionicons name={iconName} size={size} color={color} />;
                        }

                        return icon;
                    },
                    headerShown: false,
                    animation: 'fade'
                })}>
                <Tab.Screen name="Search" component={SearchStackNavigator} />
                <Tab.Screen name="User" component={UserStackNavigator} />
            </Tab.Navigator>
        </NavigationContainer >
    );
}

export default MainNavigation;