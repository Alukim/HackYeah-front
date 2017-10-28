import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class NotificationsView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="notifications" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <View><Text>Notifications view</Text></View>
    );
  }
}
