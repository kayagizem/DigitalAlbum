import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react';
import { View, Text } from 'react-native';

import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import AlbumFollowerScreen from './src/screens/AlbumFollowerScreen';

import { defaultTheme, darkTheme, greenTheme } from './src/Themes';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const Stack = createStackNavigator();

export default function App() {
  theme = setTheme(1);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      setLoading(false);
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  })

  if (loading) {
    return (
      <View><Text>Loading Screen </Text></View>
    )
  }
  if (loggedIn) {
    return (
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade'
          }}>
          <Stack.Screen name="User Profile" component={UserProfileScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Album" component={AlbumScreen} />
          <Stack.Screen name="Album Follower" component={AlbumFollowerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}>
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const setTheme = (themeCode) => {
  theme = defaultTheme;
  switch (themeCode) {
    case 1:
      theme = darkTheme;
      break;
    case 2:
      theme = greenTheme;
      break;
  }
  return theme;
}