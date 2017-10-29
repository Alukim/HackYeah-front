import React from 'react';
import { Platform } from 'react-native';
import { Location, Permissions } from 'expo';
import { Icon, Container, Content } from 'native-base';
import FilterBar from './FilterBar';
import AlertCard from './AlertCard';

const isIOS = Platform.OS === 'ios';

const cardsData = [
  {
    id: '234235',
    userName: 'Łukasz Jenczmyk',
    localization: 'Tauron Arena, Kraków',
    category: 'Homeless',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies dictum ipsum in pretium. Duis a sodales nibh, et egestas libero. Nullam aliquet augue sed neque fringilla tempus.',
    imageURL: null,
    confirmCount: 7,
    date: '2017-10-27T19:34:00Z',
  },
  {
    id: '98174289',
    userName: 'Elon Musk',
    localization: 'Hawthorne, USA',
    category: 'Other',
    description: 'Curabitur gravida erat eleifend ullamcorper blandit.',
    imageURL: null,
    confirmCount: 0,
    date: '2017-10-26T19:34:00Z',
  },
];

export default class ListView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Alerts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ color: tintColor }} />
    ),
  };
  state = {};
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({});

    }
  }
  render() {
    const showMessage = () => {
      console.log('Confirm!');
    };
    const cards = cardsData.map(cardData => (
      <AlertCard key={cardData.id} alertData={cardData} onConfirm={showMessage} />
    ));
    return (
      <Container style={{ paddingTop: isIOS ? 50 : 0, backgroundColor: '#efefef' }}>
        <Content style={{ padding: 15 }}>
          <FilterBar />
          { cards }
        </Content>
      </Container>
    );
  }
}
