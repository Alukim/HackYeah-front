import React, { Component } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import { Icon, Label, Form, Input, Item, Text, Button, Container } from 'native-base';

import config from '../../../config';

const styles = {
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'white',
  },
  input: {
  },
  inputLabel: {
    opacity: 0.7,
  },
  form: {
    marginHorizontal: 50,
    marginTop: 50,
    flex: 1,
    height: '100%',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
  },
  logo: {
    marginTop: 100,
    width: '100%',
    height: 70,
  },
};


export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  changePassword(value) {
    this.setState({ password: value })
  }

  changeUsername() {
    this.setState({ username: value })
  }


  render() {
    return (
      <Image style={styles.img} source={require('../../img/loginScreen.jpg')}>
        <Image style={styles.logo} resizeMode="contain" source={require('../../img/logo.png')} />
        <Form style={styles.form}>
          <Item floatingLabel style={styles.input}>
            <Icon name="person" style={styles.icon} />
            <Label style={styles.label}>Username</Label>
            <Input onChangeText={this.changeUsername.bind(this)} value={this.state.username} />
          </Item>
          <Item floatingLabel>
            <Icon name="lock" style={styles.icon} />
            <Label style={styles.label}>Password</Label>
            <Input onChangeText={this.changePassword.bind(this)} value={this.state.password} />
          </Item>
          <Button backgroundColor="#2196f3"><Text>Sign in</Text></Button>
        </Form>
      </Image>
    );
  }
}
