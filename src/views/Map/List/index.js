import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class ListView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Alerts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <View><Text>List view</Text></View>
    );
  }
}