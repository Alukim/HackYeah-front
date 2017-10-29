import React from 'react';
import { Platform, AsyncStorage, StatusBar } from 'react-native';
import { Container } from 'native-base';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Expo from 'expo';

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
      activeTintColor: '#2196f3',
      inactiveTintColor: '#b0b0b0',
      indicatorStyle: { backgroundColor: '#2196f3' },
      showIcon: true,
      showLabel: iOS,
      style: {
        backgroundColor: '#fff',
      },
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

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#fff" />
        {
          this.state.isAuthorized
          ? <AppRouter />
          : <LoginView />
        }
      </Container>
    );
  }
}
