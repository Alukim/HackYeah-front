import React, { Component } from 'react';
import { Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Icon, Label, Form, Input, Item, Text, Button, Container } from 'native-base';

import config from '../../../config';

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  icon: {
    color: 'white',
  },
  input: {
  },
  inputLabel: {
    opacity: 0.7,
  },
});


export default class Registration extends React.Component {
  state = {  }
  render() {
    return (
      <Container>
        <Image style={styles.img} source={require('../../img/loginScreen.jpg')}>
          <Text> Socialize </Text>
          <KeyboardAvoidingView>
            <Form>
              <Item floatingLabel>
                <Icon name="person" style={styles.icon} >
                  <Label>Username</Label>
                  <Input />
                </Icon>
                <Input />
              </Item>
              <Item fixedLabel>
                <Icon name='lock' style={styles.icon} >
                  <Label> Password </Label>
                </Icon>
                <Input />
              </Item>
            </Form>
          </KeyboardAvoidingView>
        </Image>
      </Container>
    );
  }
}