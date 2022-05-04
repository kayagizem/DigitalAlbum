import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useEffect } from 'react';

import ProfileScreen from './screens/ProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AlbumScreen from './screens/AlbumScreen';
import AlbumFollowerScreen from './screens/AlbumFollowerScreen';
import AlbumCreationScreen from './screens/AlbumCreationScreen';
import SearchScreen from './screens/SearchScreen';

import { useStateValue } from './StateProvider';

import { getAuth } from 'firebase/auth';

import { getUserDataByEmail, getUserDataByUsername } from './backend/firebase';

const Stack = createStackNavigator();

function MainNavigation({ theme }) {
    const [state, dispatch] = useStateValue();

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
        })
    }

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade'
                }}>
                <Stack.Screen name="Album Creation" component={AlbumCreationScreen} />
                <Stack.Screen name="User Profile" component={UserProfileScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Album" component={AlbumScreen} />
                <Stack.Screen name="Album Follower" component={AlbumFollowerScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;