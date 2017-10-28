import React from 'react';
import { } from 'react-native';
import { Container, Content, Text, Card, CardItem, Body } from 'native-base';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Content>
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
