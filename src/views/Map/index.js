import React from 'react';
import { Container, Icon, Text } from 'native-base';


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
      <Container>

        <Text>Map view</Text>
      </Container>
    );
  }
}
