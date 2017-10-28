import React from 'react';
import { } from 'react-native';
import { Container, Content, Text, Card, CardItem, Body, Icon } from 'native-base';


export default class ListView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Alerts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>
                { 'Header!!!' }
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  { 'Card content!' }
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>
                { 'Footer!' }
              </Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>
                { 'Header!' }
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  { 'Card content!' }
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>
                { 'Footer!' }
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>

    );
  }
}
