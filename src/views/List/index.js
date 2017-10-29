import React from 'react';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { Image, Text, View, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon, Fab } from 'native-base';
import FilterBar from './FilterBar';
import AlertCard from './AlertCard';
import config from '../../../config/index.js';

const isIOS = Platform.OS === 'ios';

export default class ListView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Alerts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ color: tintColor }} />
    ),
  };
  state = {
    alertsList: []
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      /*
      await Location.getCurrentPositionAsync({}).then(coords => {

      });
      */
    }

    const response = await axios.get(`${config.apiURL}/alerts`);

    if (response.status === 200) {
      this.setState({ alertsList: response.data });
    } else {
      console.log(response.status);
    }
  }
  render() {
    const confirmAlert = (id) => {
      return () => {
        const x = this.state.alertsList.map((alert) => {
          if (alert.confirmed) {
            return alert;
          }
          return alert.id !== id
            ? alert
            : Object.assign({}, alert, { confirmed: true, confirmedBy: [...alert.confirmedBy, null] });
        });
        this.setState({ alertsList: x });
      };
    };
    const { navigation } = this.props;
    const cards = this.state.alertsList.map(cardData => (
      <AlertCard key={cardData.id} alertData={cardData} onConfirm={confirmAlert(cardData.id)} />
    ));
    return (
      <Container style={{ paddingTop: isIOS ? 15 : 0, backgroundColor: '#eeeeef' }}>
        {!isIOS && (
          <Fab
            position="bottomRight"
            onPress={() => navigation.navigate('NewAlert')}
            style={{ backgroundColor: '#2196f3', zIndex: 9999999 }}
          >
            <Icon name="add" />
          </Fab>
        )}
        <Content style={{ padding: 15 }}>
          <FilterBar />
          { cards }
        </Content>
      </Container>
    );
  }
}
