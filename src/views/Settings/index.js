import React from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';
import { Icon, Container } from 'native-base';

export default class SettingsView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <Container>
        <Button title='Sing out' onPress={ async () => {
          await AsyncStorage.removeItem('userId');
          this.props.navigation.navigate('Login');
          }} 
          /> 
      </Container>
    );
  }
}