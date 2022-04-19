import React, {Component} from 'react';
import { View, Text, Pressable, Button, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import styles from '../Style';
require('firebase/firestore');

export class SignUpScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            username:'',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp()  {
        const{email,password,name,username} = this.state
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result) => {
             firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email,
                username
            })
            .then(() => {
                console.log('User added!');
              });
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
                        onPress={() => this.props.navigation.goBack()}>Back</Text>
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
                <Button
                 onPress={() => this.onSignUp()}
                 title="SIGN UP"
                 color="#5AA2B1"
                />

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
                        onPress={() => this.props.navigation.navigate("Log In")}>Already have an account? Log in.</Text>
                </View>
            </View>
        </View>
    )
    }
}

export default SignUpScreen;