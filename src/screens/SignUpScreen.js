import React, {Component} from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Alert, Button } from 'react-native-web';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import styles from '../Style';
import {auth} from '/Users/gizem.kaya/DigitalAlbum-1/src/firebase.js'
import {createUserWithEmailAndPassword} from 'firebase/auth'



export default class SignUpScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            username: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const{email, password, name, username} = this.state
        createUserWithEmailAndPassword(auth,email,password)
        .then((result) => {
            console.log(result)
        })
        .catch((error)=> {
            console.log(error)
        })
    }


    render(){
    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeftBox}>
                    <Text style={styles.headerText}
                        onPress={() => navigation.goBack()}>Back</Text>
                </View>
                <Text style={styles.headerTitle}>Sign Up</Text>
                <View style={styles.headerRightBox}>
                </View>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(name) => this.setState({name})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({username})}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
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
                    onPress={() => onSignUp()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                
                <View style={styles.textContainer}>
                    <Text style={{
                        color: '#666666',
                        marginTop: 10,
                    }}>
                        By signing up, you agree to our <Text style={{ color: '#00A3FF' }}>Terms</Text> and <Text style={{ color: '#00A3FF' }}>Data Policy</Text>.
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkText}
                        onPress={() => props.navigation.goBack()}>Already have an account? Log in.</Text>
                </View>
            </View>
        </View>
    )
    }
}

