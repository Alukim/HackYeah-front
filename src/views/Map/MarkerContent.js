import React from 'react';
import { Card, CardItem, Body, Text } from 'native-base';
import { Image, View } from 'react-native';

import config from '../../../config';

export default class MarkerContent extends React.Component {
  state = {
  };

  render() {
    const { cardData } = this.props;
    return (
      <Card style={{ marginBottom: 30, flex: 1 }}>
        <CardItem
          cardBody
          style={[{
            borderRadius: 0,
            height: 4,
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            backgroundColor: config.alertColors[cardData.category.toLowerCase()],
          }]}
        />
        <CardItem>
          <Body>
            <Text>
              { cardData.userName }
            </Text>
            <Text style={{ fontSize: 12 }}>
              { cardData.location }
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
    );
  }
}
