import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Icon, Label, Form, Input, Item, Text, Button } from 'native-base';

import config from '../../../config';

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },
  icon: {
    color: 'white'
  }
});

export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Image style={styles.img} source={require('../../img/loginScreen.jpg')}>
        <Text> Socialize </Text>
        <Form>
          <Item fixedLabel>
            <Icon name='profile' style={styles.icon}/>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item fixedLabel last>
            <Icon name='arrow-back'/>
            <Label>Lastname</Label>
            <Input />
          </Item>
        </Form>
        <Button block info>
          <Text> Sign in </Text>
        </Button>
      </Image>
    );
  }
}