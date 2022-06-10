import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AlbumScreen from '../screens/AlbumScreen';
import AlbumFollowerScreen from '../screens/AlbumFollowerScreen';
import AlbumContributorScreen from '../screens/AlbumContributorScreen';
import AlbumCreationScreen from '../screens/AlbumCreationScreen';
import SearchScreen from '../screens/SearchScreen';
import CommentScreen from '../screens/CommentScreen';
import PostCreationScreen from '../screens/PostCreationScreen';

const SearchStack = createStackNavigator();

function SearchStackNavigator() {
    return (
        <SearchStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <SearchStack.Screen name="Search" component={SearchScreen} />
            <SearchStack.Screen name="User Profile" component={UserProfileScreen} />
            <SearchStack.Screen name="Album Creation" component={AlbumCreationScreen} />
            <SearchStack.Screen name="Profile" component={ProfileScreen} />
            <SearchStack.Screen name="Album" component={AlbumScreen} />
            <SearchStack.Screen name="Album Follower" component={AlbumFollowerScreen} />
            <SearchStack.Screen name="Album Contributor" component={AlbumContributorScreen} />
            <SearchStack.Screen name="Comment" component={CommentScreen} />
            <SearchStack.Screen name="Post Creation" component={PostCreationScreen} />
        </SearchStack.Navigator>
    );
}

export default SearchStackNavigator;