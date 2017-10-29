import React from 'react';
import axios from 'axios';
import {
  Icon, Container, Content, Button, Text,
  Card, Form, CardItem, Item, Picker, Input,
  Label,
} from 'native-base';
import { Platform, View } from 'react-native';
import { Permissions } from 'expo';

import config from '../../../config';

const iOS = Platform.OS === 'ios';

export default class NewAlertView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'New alert',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="add" style={{ color: tintColor }} />
    ),
  };

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
  }

  state = {
    useCamera: true,
    showCamera: false,
    categories: [],
    selectedCategory: '',
    location: '',
    region: {
      latitude: 50.0676592,
      longitude:  19.988532,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ useCamera: status === 'granted' });

    const response = await axios.get(`${config.apiURL}/alerts/categories`);
    if (response.status === 200) {
      this.setState({ categories: response.data });
    }

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ useLocation: false });
    } else {
      const { coords } = await Location.getCurrentPositionAsync({});
      this.setState({
        region: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    }
  }

  selectCategory(value) {
    this.setState({ selectedCategory: value });
  }

  changeDescription(value) {
    this.setState({ descripiton: value });
  }

  changeLocation(value) {
    this.setState({ location: value });
  }

  render() {
    const { useCamera, showCamera, categories, selectedCategory, descripiton, region, location } = this.state;

    return (
      <Container style={{ paddingTop: iOS ? 15 : 0, backgroundColor: '#eeeeef' }}>
        <Content style={{ padding: 15 }}>
          <Card>
            <CardItem>
              <Form style={{ marginLeft: -25, flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                  <Button
                    transparent
                    iconLeft
                    dark
                    onClick={() => this.setState({ showCamera: true })}
                    style={{
                      height: 120,
                      width: 120,
                      flexDirection: 'column',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}
                  >
                    <Icon style={{ color: '#494949', marginTop: 5, fontSize: 50 }} name="camera" />
                    <Text style={{ color: '#494949', marginLeft: 10, fontSize: 11, width: '100%', textAlign: 'center' }}>
                      Take a photo/video
                    </Text>
                  </Button>
                  <Button
                    transparent
                    iconLeft
                    dark
                    onClick={() => this.setState({ showCamera: true })}
                    style={{
                      height: 120,
                      width: 120,
                      flexDirection: 'column',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}
                  >
                    <Icon style={{ color: '#494949', marginTop: 5, fontSize: 50 }} name="images" />
                    <Text style={{ color: '#494949', marginLeft: 10, fontSize: 11, width: '100%', textAlign: 'center' }}>
                      Add from library
                    </Text>
                  </Button>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                  <Picker
                    mode="dropdown"
                    placeholder="Select category"
                    selectedValue={selectedCategory}
                    onValueChange={this.selectCategory}
                    style={{
                      borderBottomWidth: 2,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomColor: selectedCategory ? config.alertColors[selectedCategory.toLowerCase()] : '#eee',
                    }}
                  >
                    {categories.map((category, i) => (
                      <Item
                        floatingLabel
                        key={`category-${i}`}
                        label={category}
                        value={descripiton}
                        onValueChange={this.selectCategory}
                      />
                    ))}
                  </Picker>
                  {iOS
                    ? <Input
                      numberOfLines={4}
                      maxLength={250}
                      multiline
                      value={descripiton}
                      onValueChange={this.changeDescription}
                    />
                    : <Item floatingLabel>
                      <Label>Description</Label>
                      <Input
                        numberOfLines={4}
                        maxLength={250}
                        multiline
                        value={descripiton}
                        onValueChange={this.changeDescription}
                      />
                    </Item>
                  }
                  {iOS
                    ? <Input value={descripiton} onValueChange={this.changeDescription} />
                    : <Item floatingLabel>
                      <Label>Description</Label>
                      <Input
                        numberOfLines={4}
                        maxLength={250}
                        multiline
                        value={descripiton}
                        onValueChange={this.changeDescription}
                      />
                    </Item>
                  }
                </View>
              </Form>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}