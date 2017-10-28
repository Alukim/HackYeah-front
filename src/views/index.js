import React from 'react';
import { Platform, AsyncStorage, StatusBar, StyleSheet } from 'react-native';
import { Container, Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';

import LoginView from './Login';

import MapView from './Map';
import ListView from './List';
import NewAlertView from './NewAlert';
import NotificationsView from './Notifications';
import SettingsView from './Settings';

const iOS = Platform.OS === 'ios';

let views = {
  List: { screen: ListView },
  Map: { screen: MapView },
  Notifications: { screen: NotificationsView },
  Settings: { screen: SettingsView },
};

if (iOS) {
  views = {
    List: views.List,
    Map: views.Map,
    NewAlert: { screen: NewAlertView },
    Notifications: views.Notifications,
    Settings: views.Settings,
  };
}

const AppRouter = TabNavigator(views, {
  initialRouteName: 'List',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: iOS,
    style: { marginTop: StatusBar.currentHeight },
  },
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
