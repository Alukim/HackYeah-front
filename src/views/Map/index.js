import React from 'react';
import { Platform } from 'react-native';
import { Container, Icon, Fab, Text } from 'native-base';

const iOS = Platform.OS === 'ios';

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
    const { navigation } = this.props;

    return (
      <Container>
        {!iOS && (
          <Fab
            position="bottomRight"
            onPress={() => navigation.navigate('NewAlert')}
          >
            <Icon name="add" />
          </Fab>
        )}
        <Text>Map view</Text>
      </Container>
    );
  }
}
