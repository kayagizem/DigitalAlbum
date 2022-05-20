import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AlbumScreen from '../screens/AlbumScreen';
import AlbumFollowerScreen from '../screens/AlbumFollowerScreen';
import AlbumCreationScreen from '../screens/AlbumCreationScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';

const SettingsStack = createStackNavigator();

export default function SettingsStackNavigator() {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="Search" component={SearchScreen} />
            <SettingsStack.Screen name="User Profile" component={UserProfileScreen} />
            <SettingsStack.Screen name="Album Creation" component={AlbumCreationScreen} />
            <SettingsStack.Screen name="Profile" component={ProfileScreen} />
            <SettingsStack.Screen name="Album" component={AlbumScreen} />
            <SettingsStack.Screen name="Album Follower" component={AlbumFollowerScreen} />
        </SettingsStack.Navigator>
    );
}