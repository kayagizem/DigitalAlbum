import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AlbumScreen from '../screens/AlbumScreen';
import AlbumFollowerScreen from '../screens/AlbumFollowerScreen';
import AlbumCreationScreen from '../screens/AlbumCreationScreen';
import SearchScreen from '../screens/SearchScreen';


const NotificationStack = createStackNavigator();

function NotificationStackNavigator() {
    return (
        <NotificationStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }
            }>
            <NotificationStack.Screen name="Notifications" component={NotificationScreen} />
            <NotificationStack.Screen name="Profile" component={ProfileScreen} />
            <NotificationStack.Screen name="Album" component={AlbumScreen} />
            <NotificationStack.Screen name="Album Follower" component={AlbumFollowerScreen} />
        </NotificationStack.Navigator>
    );
}

export default NotificationStackNavigator;