import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MainScreen from './src/components/Main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk'

const store =  createStore(rootReducer, applyMiddleware(thunk))

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn,loaded} = this.state;
    if(!loggedIn){
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
    return(
      <Provider store = {store}>
      <MainScreen/>
      </Provider>
    )
  }
}

export default App
