import { NavigationContainer } from '@react-navigation/native';

import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAb-1cqIzw_fTskyJy-HipthN6WE-YyG2o",
  authDomain: "digitalalbum-66304.firebaseapp.com",
  projectId: "digitalalbum-66304",
  storageBucket: "digitalalbum-66304.appspot.com",
  messagingSenderId: "485978111635",
  appId: "1:485978111635:web:343eaf7b37969ff5759766",
  measurementId: "G-2M8V9L786E"
};

if (firebase.getApps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}>
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}