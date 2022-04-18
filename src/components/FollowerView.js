import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

/*
* Created custom component
* <WideButton title='Sign Up' />
* Components like Sign Up and Log In button.
* It will be tested.
*/

function FollowerView(props) {
    return (
        <View style={props.style}>
            <Pressable onPress={() => props.nav.navigate('Profile', { uid: props.uid })} >
                <View style={styles.followerContainer}>
                    <Image style={styles.profilePicture}
                        source={{ uri: props.image }}>
                    </Image>
                    <Text style={styles.userID}>{props.uid}</Text>
                </View>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    followerContainer: {
        padding: 10,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        flexDirection: 'row',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 45,
    },
    userID: {
        fontSize: 14,
        color: '#073D48',
        fontWeight: 'bold',
        marginLeft: 15
    }
});

export default FollowerView;