import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';

export default class LoginView extends Component {
  state = {
    LoginRouter: null
  };

  componentWillMount() {
    this.setState({
      LoginRouter: StackNavigator({
        Login: { screen: Login },
        Register: { screen: Register },
        Main: { screen: this.props.MainRouter }
      }, {
        initialRouteName: 'Login',
        headerMode: 'hidden',
      })
    })
  }

  render() {
    const { LoginRouter } = this.state;
    return (
      <LoginRouter />
    );
  }
}
