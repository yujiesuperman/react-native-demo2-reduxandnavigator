/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import NavigatorBar from 'react-native-navbar';

import commonStyles from '../styles/common';

import { logOut } from '../actions/user';



class Main extends Component {

  constructor(props){
      super(props);
  }

  shouldComponentUpdate(nextProps, nextState){
      if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === false){
          //logout, need to redirect login page
          this.toLogin();
          return false;
      }
      return true;
  }

  toLogin(){
      let {router} = this.props;
      router.resetToLogin();
  }

  _renderNavBar(){
      let {router, user, dispatch} = this.props;
      var leftButtonConfig = {
          title: 'Logout',
          handler: ()=>{
              dispatch(logOut());
          }
      };

      var titleConfig = {
          title: user.name || '',
      };
      return <NavigatorBar style={commonStyles.navbar}
                  title={titleConfig}
                  leftButton={leftButtonConfig}  />;
  }

  render() {
    let {user} = this.props;
    return (
      <View style={[commonStyles.main, commonStyles.wrapper]}>
      {this._renderNavBar()}
      <View style={styles.container} >
      
        <Text >name: {user.name}</Text>
        <Text>age: {user.age}</Text>
        
      </View>
      </View>
      );

  }


  handlePress(){
    console.log('handlePress');

  }

  handleAsyncPress(){
    console.log('asyncPress');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


function select(store){
  return {
      isLoggedIn: store.userStore.isLoggedIn,
      user: store.userStore.user,
  }
}


export default connect(select)(Main);
