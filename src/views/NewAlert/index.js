import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class NewAlertView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="add" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <View><Text>New alert view</Text></View>
    );
  }
}