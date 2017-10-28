import React from 'react';
import { AsyncStorage, StatusBar, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { TabNavigator } from 'react-navigation';

import LoginView from './Login';

import MapView from './Map';
import ListView from './List';
import NewAlertView from './NewAlert';
import NotificationsView from './Notifications';
import SettingsView from './Settings';

const AppRouter = TabNavigator({
  Map: { screen: MapView },
  List: { screen: ListView },
  NewAlert: { screen: NewAlertView },
  Notifications: { screen: NotificationsView },
  Settings: { screen: SettingsView },
}, {
  initialRouteName: 'NewAlert',
  tabBarOptions: {
    style: {
      marginTop: StatusBar.currentHeight,
    },
  },
  animationEnabled: true,
});

const styles = StyleSheet.create({
  marginTop: StatusBar.currentHeight,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: true,
    };

    // AsyncStorage
    //   .getItem('isAuthorized')
    //   .then(isAuthorized => this.setState({ isAuthorized }));
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor="blue" />
        {
          this.state.isAuthorized
            ? <AppRouter />
            : <LoginView />
        }
      </Container>
    );
  }
}
