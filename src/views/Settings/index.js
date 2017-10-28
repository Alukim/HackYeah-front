import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class SettingsView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <View><Text>Settings view</Text></View>
    );
  }
}
