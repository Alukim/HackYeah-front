import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card, CardItem, Icon, Button, Body, Right } from 'native-base';
import moment from 'moment';

const categoryColors = new Map([
  ['Homeless', '#e84c3d'],
  ['Other', '#2196f3'],
  ['Other 2', '#009c00'],
  ['Other 3', ' #ff8200'],
]);

export default function AlertCard({ alertData }) {
  return (
    <Card style={{ marginBottom: 15 }}>
      <CardItem
        cardBody
        style={{
            borderRadius: 0,
            height: 4,
            backgroundColor: categoryColors.get(alertData.category),
          }}
      />
      <CardItem>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Body>
            <Text>
              { alertData.userName }
            </Text>
            <Text style={{ fontSize: 12 }}>
              { alertData.localization }
            </Text>
          </Body>
          <Right>
            <Text note style={{ textAlign: 'right' }}>{ moment(alertData.date).fromNow() }</Text>
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
            { alertData.category }
          </Text>
          <Text>
            { alertData.description }
          </Text>
          <Body>
            <Button iconLeft full transparent>
              <Icon name="md-checkmark-circle" style={{ color: '#3de881' }} />
              <Text> {alertData.confirmCount} people confirmed this alert</Text>
            </Button>
          </Body>
        </View>
      </CardItem>
    </Card>
  );
}
