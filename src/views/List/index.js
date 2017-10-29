import React from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon, Fab } from 'native-base';

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
  },
  {
    id: '98174289',
    userName: 'Elon Musk',
    localization: 'Hawthorne, USA',
    category: 'Other',
    description: 'Curabitur gravida erat eleifend ullamcorper blandit.',
    imageURL: null,
    confirmCount: 0,
  },
];
const categoryColors = new Map([
  ['Homeless', 'orange'],
  ['Other', 'gray'],
]);

export default class ListView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Alerts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ color: tintColor }} />
    ),
  };

  render() {
    const { navigation } = this.props;
    const cards = cardsData.map(cardData => (
      <Card key={cardData.id} style={{ marginBottom: 30 }}>
        <CardItem
          cardBody
          style={[
            {
              borderRadius: 0, height: 4, padding: 0, margin: 0, overflow: 'hidden',
            },
            {
              backgroundColor: categoryColors.get(cardData.category),
            },
          ]}
        />
        <CardItem>
          <Body>
            <Text>
              { cardData.userName }
            </Text>
            <Text style={{ fontSize: 12 }}>
              { cardData.localization }
            </Text>
          </Body>
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
          </View>
        </CardItem>
      </Card>
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
          { cards }
        </Content>
      </Container>

    );
  }
}
