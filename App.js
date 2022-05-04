import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react';
import { View, Text } from 'react-native';

import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';

import { defaultTheme, darkTheme, greenTheme } from './src/Themes';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { StateProvider } from './src/StateProvider';
import MainNavigation from './src/MainNavigation';

const Stack = createStackNavigator();

export default function App() {
  const initialState = {
    userData: {}
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case 'setUserData':
        return {
          ...state,
          userData: action.payload
        }

      default:
        return state;
    }
  }

  theme = setTheme(0);

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
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {loggedIn
        ? (
          <MainNavigation theme={theme} />
        ) : (
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
        )
      }
    </StateProvider>
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