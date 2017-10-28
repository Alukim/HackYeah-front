import React from 'react';
import { TabNavigator } from 'react-navigation';

import LoginPage from './Login';

const Router = TabNavigator({
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: localStorage.getItem('isAuthorized'),
    };
  }

  render() {
    return (
      this.state.isAuthorized
        ? <Router />
        : <LoginPage />
    );
  }
}
