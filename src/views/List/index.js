import React from 'react';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { Image, Text, View, Platform, AsyncStorage } from 'react-native';
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
  constructor() {
    super();
    this.state = {
      alertsList: [],
    };
    //this.loadData = this.loadData.bind(this);
  }
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    this.setState({userId: userId});
    this.loadData(1);
  }
  async loadData(type) {
    console.log('load data, type='+type);
    const options = type === 0 ? ('?UserId='+this.state.userId) : '';
    //this.setState({ alertsList: [] });
    console.log('options: ' + options);
    const response = await axios.get(`${config.apiURL}/alerts` + options);

    if (response.status === 200) {
      console.log(response.data.length);
      this.setState({ alertsList: response.data });
    } else {
      console.log('error');
      console.log(response.status);
    }
  }
  render() {
    const confirmAlert = (id) => {
      return () => {
        const newList = this.state.alertsList.map((alert) => {
          if (alert.confirmed || alert.id !== id) {
            return alert;
          }
          return Object.assign({}, alert, { confirmed: true, confirmedBy: [...alert.confirmedBy, this.state.userId] });
        });
        console.log('send ' + id);
        axios.patch(`${config.apiURL}/alerts/${id}/confirm`).then(response => {
          console.log('response')
        });
        this.setState({ alertsList: newList });
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
          <FilterBar onChange={this.loadData} />
          { cards }
        </Content>
      </Container>
    );
  }
}
