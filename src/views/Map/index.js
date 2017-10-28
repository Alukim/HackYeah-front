import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class MapView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map" style={{ color: tintColor }} />
    ),
  };

  state = {
  };

  render() {
    return (
      <View><Text>Map view</Text></View>
    );
  }
}
