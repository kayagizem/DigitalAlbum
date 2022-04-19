import React, { Component } from 'react'
import  {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../redux/actions/index' 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import { View } from 'react-native-web';
import LoginScreen from '../screens/LoginScreen';

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
  render() {
      const {currentUser} = this.props;
      console.log(currentUser)

    return (
            <ProfileScreen />  
        )
  }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators ({fetchUser},dispatch);

export default connect (mapStateToProps,mapDispatchProps)(Main);