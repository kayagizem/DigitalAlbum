import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AlbumScreen from '../screens/AlbumScreen';
import AlbumFollowerScreen from '../screens/AlbumFollowerScreen';
import AlbumContributorScreen from '../screens/AlbumContributorScreen';
import AlbumCreationScreen from '../screens/AlbumCreationScreen';
import PostCreationScreen from '../screens/PostCreationScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import CommentScreen from '../screens/CommentScreen';

const UserStack = createStackNavigator();

function UserStackNavigator() {
    return (
        <UserStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <UserStack.Screen name="User Profile" component={UserProfileScreen} />
            <UserStack.Screen name="Profile Settings" component={ProfileSettingsScreen} />
            <UserStack.Screen name="Album Creation" component={AlbumCreationScreen} />
            <UserStack.Screen name="Profile" component={ProfileScreen} />
            <UserStack.Screen name="Album" component={AlbumScreen} />
            <UserStack.Screen name="Album Follower" component={AlbumFollowerScreen} />
            <UserStack.Screen name="Album Contributor" component={AlbumContributorScreen} />
            <UserStack.Screen name="Post Creation" component={PostCreationScreen} />
            <UserStack.Screen name="Comment" component={CommentScreen} />
        </UserStack.Navigator>
    );
}

export default UserStackNavigator;