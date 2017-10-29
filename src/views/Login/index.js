import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';

const LoginRouter = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
}, {
  initialRouteName: 'Login',
  headerMode: 'hidden',
});

export default class LoginView extends Component {
  state = {

  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <LoginRouter />
      </KeyboardAvoidingView>
    );
  }
}
