import React from 'react';
import { Platform, AsyncStorage, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import LoginView from './Login';
import MapView from './Map';
import ListView from './List';
import NewAlertView from './NewAlert';
import NotificationsView from './Notifications';
import SettingsView from './Settings';

const iOS = Platform.OS === 'ios';

let AppRouter;

if (iOS) {
  AppRouter = TabNavigator({
    List: { screen: ListView },
    Map: { screen: MapView },
    NewAlert: { screen: NewAlertView },
    Notifications: { screen: NotificationsView },
    Settings: { screen: SettingsView },
  }, {
    initialRouteName: 'List',
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: iOS,
      style: { marginTop: StatusBar.currentHeight },
    },
  });
} else {
  const TabRouter = TabNavigator({
    List: { screen: ListView },
    Map: { screen: MapView },
    Notifications: { screen: NotificationsView },
    Settings: { screen: SettingsView },
  }, {
    initialRouteName: 'List',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: iOS,
    },
  });

  AppRouter = StackNavigator({
    Tabs: { screen: TabRouter },
    NewAlert: { screen: NewAlertView },
  }, {
    initialRouteName: 'Tabs',
    headerMode: 'hidden',
    cardStyle: { marginTop: StatusBar.currentHeight },
  });
}

export default class App extends React.Component {
  state = { isAuthorized: true }

  render() {
    return (
      this.state.isAuthorized
        ? <AppRouter />
        : <LoginView />
    );
  }
}
