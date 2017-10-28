import React from 'react';
import { TabNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';

import LoginView from './Login';
import MapView from './Map';
import ListView from './List';
import NewAlertView from './NewAlert';
import NotificationsView from './Notifications';
import SettingsView from './Settings';

const Router = TabNavigator({
  Map: { screen: MapView },
  List: { screen: ListView },
  NewAlert: { screen: NewAlertView },
  Notifications: { screen: NotificationsView },
  Settings: { screen: SettingsView },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false,
    };

    AsyncStorage
      .getItem('isAuthorized')
      .then(isAuthorized => this.setState({ isAuthorized }));
  }

  render() {
    return (
      this.state.isAuthorized
        ? <Router />
        : <LoginView />
    );
  }
}
