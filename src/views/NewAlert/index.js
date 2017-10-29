import React from 'react';
import axios from 'axios';
import {
  Icon, Container, Content, Button, Text,
  Card, Form, CardItem, Item, Picker, Input,
  Label,
} from 'native-base';
import { Platform, View } from 'react-native';
import { Permissions, MapView } from 'expo';

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
    this.changeLocation = this.changeLocation.bind(this);
  }

  state = {
    useLocation: true,
    useCamera: true,
    showCamera: false,
    categories: [],
    selectedCategory: '',
    location: '',
    description: '',
    region: {
      latitude: 50.0676592,
      longitude:  19.988532,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  async componentDidMount() {
    let status = await Permissions.askAsync(Permissions.CAMERA).status;
    this.setState({ useCamera: status === 'granted' });

    const response = await axios.get(`${config.apiURL}/alerts/categories`);
    if (response.status === 200) {
      this.setState({ categories: response.data });
    }

    status = await Permissions.askAsync(Permissions.LOCATION).status;
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
    this.setState({ description: value });
  }

  changeLocation(value) {
    this.setState({ location: value });
  }

  render() {
    const { useLocation, useCamera, showCamera, categories, selectedCategory, description, region, location } = this.state;
    return (
      <Container style={{ paddingTop: iOS ? 15 : 0, backgroundColor: '#eeeeef' }}>
        <Content style={{ padding: 15 }}>
          <Card>
            <CardItem>
              <Form style={{ overflow: 'hidden', marginHorizontal: -20, flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', width: '100%' }}>
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
                      width: '100%',
                    }}
                  >
                    {categories && categories.map((category, i) => (
                      <Item
                        floatingLabel
                        key={`category-${i}`}
                        label={category}
                        value={category}
                        onValueChange={this.selectCategory}
                      />
                    ))}
                  </Picker>
                  {iOS
                    ? <Input
                      numberOfLines={4}
                      maxLength={250}
                      multiline
                      value={description}
                      placeholder="Description"
                      onChangeText={this.changeDescription}
                    />
                    : <Item floatingLabel>
                      <Label>Description</Label>
                      <Input
                        numberOfLines={4}
                        maxLength={250}
                        multiline
                        value={description}
                        onChangeText={this.changeDescription}
                      />
                    </Item>
                  }
                  {iOS
                    ? <Input placeholder="Location" value={location} onChangeText={this.changeLocation} />
                    : <Item floatingLabel>
                      <Label>Location</Label>
                      <Input value={location} onChangeText={this.changeLocation} />
                    </Item>
                  }
                </View>
                <MapView
                  loadingBackgroundColor="#efefef"
                  style={{ marginTop: 15, marginBottom: -15, flex: 1, height: 200, width: '100%' }}
                  loadingEnabled
                  showsPointsOfInterest
                  showsMyLocationButton
                  showsUserLocation
                  showsScale
                  showsBuildings
                  initialRegion={useLocation ? region : {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </Form>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}