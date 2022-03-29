import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';

import styles from '../Style';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeftBox}>
                    <Text style={styles.headerText}
                        onPress={() => navigation.goBack()}>Back</Text>
                </View>
                <Text style={styles.profileId}>guitarist</Text>
                <View style={styles.headerRightBox}>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.profileBlock}>
                <View style={styles.profileContainer}>
                    <Image style={styles.profilePicture}
                        source={{ uri: 'https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg' }}>
                    </Image>
                    <View style={styles.profileButtonContainer}>
                        <View style={[styles.profileButton,
                        {
                            borderTopLeftRadius: 45,
                            borderBottomLeftRadius: 45
                        }]}>
                            <Text style={styles.profileButtonText}>Albums</Text>
                        </View>
                        <View style={[styles.profileButton,
                        {
                            borderTopRightRadius: 45,
                            borderBottomRightRadius: 45
                        }]}>
                            <Text style={styles.profileButtonText}>Follows</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.profileName}>Guitarist</Text>
                <Text style={styles.profileBio} numberOfLines={4}>Test photo is taken from Firmbee.{'\n'}My albums are awesome.
                </Text>
            </View>
        </View >
    );
}

export default ProfileScreen;