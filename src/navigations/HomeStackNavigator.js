import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AlbumScreen from '../screens/AlbumScreen';
import AlbumFollowerScreen from '../screens/AlbumFollowerScreen';
import AlbumCreationScreen from '../screens/AlbumCreationScreen';
import PostCreationScreen from '../screens/PostCreationScreen';

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Album Creation" component={AlbumCreationScreen} />
            <HomeStack.Screen name="Profile" component={ProfileScreen} />
            <HomeStack.Screen name="Album" component={AlbumScreen} />
            <HomeStack.Screen name="Album Follower" component={AlbumFollowerScreen} />
            <HomeStack.Screen name="Post Creation" component={PostCreationScreen} />
        </HomeStack.Navigator>
    );
}

export default HomeStackNavigator;

