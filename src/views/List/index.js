import React from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon, Button, Right } from 'native-base';
import moment from 'moment';
import FilterBar from './FilterBar';

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
const categoryColors = new Map([
  ['Homeless', '#e84c3d'],
  ['Other', '#2196f3'],
  ['Other 2', '#009c00'],
  ['Other 3', ' #ff8200'],
]);

export default class ListView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Alerts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ color: tintColor }} />
    ),
  };

  render() {
    const cards = cardsData.map(cardData => (
      <Card key={cardData.id} style={{ marginBottom: 15 }}>
        <CardItem
          cardBody
          style={{
              borderRadius: 0,
              height: 4,
              backgroundColor: categoryColors.get(cardData.category),
            }}
        />
        <CardItem>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Body>
              <Text>
                { cardData.userName }
              </Text>
              <Text style={{ fontSize: 12 }}>
                { cardData.localization }
              </Text>
            </Body>
            <Right>
              <Text note style={{ textAlign: 'right' }}>{ moment(cardData.date).fromNow() }</Text>
            </Right>
          </View>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: 'http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-140mmf_35-56g_ed_vr/img/sample/sample1_l.jpg' }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem cardBody>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>
              { cardData.category }
            </Text>
            <Text>
              { cardData.description }
            </Text>
            <Body>
              <Button iconLeft full transparent>
                <Icon name="md-checkmark-circle" style={{ color: '#3de881' }} />
                <Text> {cardData.confirmCount} people confirmed this alert</Text>
              </Button>
            </Body>
          </View>
        </CardItem>
      </Card>
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
