import { NavigationContainer } from '@react-navigation/native';
import react from 'react';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {auth} from '/Users/gizem.kaya/DigitalAlbum-1/src/firebase.js'




const Stack = createNativeStackNavigator();


const firebaseConfig = { 
  apiKey: "AIzaSyCwuY3N6bY1VjOPnKml8Vz0bbtriPMaKiw",
  authDomain: "digital-album-f75e7.firebaseapp.com",
  projectId: "digital-album-f75e7",
  storageBucket: "digital-album-f75e7.appspot.com",
  messagingSenderId: "39226694017",
  appId: "1:39226694017:web:46b61e0266281780667080",
  measurementId: "G-4JEG90HZMR"
};


const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}>
          <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}