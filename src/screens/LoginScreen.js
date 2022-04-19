import { View, Text, Pressable, Button, TextInput } from 'react-native';
import { Alert } from 'react-native-web';
import styles from '../Style';
import React, { Component } from 'react'
import firebase from 'firebase/compat/app';


export class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onLogIn = this.onLogIn.bind(this)

    }

    onLogIn(){
        const{email,password} =this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(result)
        })
    }

  render() {
    return (
            <View style={styles.screen}>
                <View style={styles.headerBar}>
                    <View style={styles.headerLeftBox}>
                    </View>
                    <Text style={styles.headerTitle}>Log In</Text>
                    <View style={styles.headerRightBox}>
                    </View>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={(email) => this.setState({email})}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}

                    />
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            {
                                backgroundColor: pressed ? '#69CCE2' : '#5AA2B1'
                            }
                        ]}
                        onPress={() => this.onLogIn()}
                        >
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
    
                    <View style={styles.textContainer}>
                        <Text style={styles.linkText}>Forgot your password?</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.linkText}
                            onPress={() => this.props.navigation.navigate('Sign Up')}>Don't have an account? Sign up.</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.linkText}
                            onPress={() => this.props.navigation.navigate('Profile')}>[TESTING PURPOSE] Go to profile page.</Text>
                    </View>
                    <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => this.props.navigation.navigate('Album Followers')}>[TESTING PURPOSE] Go to Album Followers page.</Text>
                </View>
                </View >
            </View>
        );
    
  }
}

export default LoginScreen