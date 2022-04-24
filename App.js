import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import AlbumFollowerScreen from './src/screens/AlbumFollowerScreen';

import { defaultTheme, darkTheme, greenTheme } from './src/Themes';

const Stack = createNativeStackNavigator();

export default function App() {
  theme = setTheme(2);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}>
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen name="Album Followers" component={AlbumFollowerScreen} />
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