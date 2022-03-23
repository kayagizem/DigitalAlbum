import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';

import styles from '../Style';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <Pressable style={styles.headerLeftBox}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>Back</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Profile</Text>
                <Pressable style={styles.headerRightBox}>
                    <Text style={styles.headerText}>Settings</Text>
                </Pressable>
            </View>
            <View style={styles.profileBlock}>
                <View style={styles.profileLeftBlock}>
                    <Image style={styles.profilePicture}
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}>
                    </Image>
                    <Text style={styles.profileName}>Emre</Text>
                </View>
                <View style={styles.profileBioBlock}>
                    <Text style={styles.profileId}>@eaydin17</Text>
                    <Text style={styles.profileBio}>Hello, text for test.
                    </Text>
                </View>
            </View>
        </View >
    );
}

export default ProfileScreen;