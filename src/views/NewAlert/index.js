import React from 'react';
import axios from 'axios';
import {
  Icon, Container, Content, Button, Text,
  Card, Form, CardItem, Item, Picker, Input,
  Label, Toast,
} from 'native-base';
import { Platform, View, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { Permissions, MapView, Camera, Location } from 'expo';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    useLocation: true,
    useCamera: true,
    showCamera: false,
    showCameraRoll: true,
    categories: [],
    selectedCategory: '',
    location: '',
    description: '',
    image: null,
    region: {
      latitude: 50.0676592,
      longitude:  19.988532,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    showPopup: false,
    message: '',
  };

  async componentDidMount() {
    await AsyncStorage.setItem('userId', 'bed0d09a-bb98-495b-887f-0cbb767637a4');0
    let permissions = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ useCamera: permissions.status === 'granted' });

    const response = await axios.get(`${config.apiURL}/alerts/categories`);
    if (response.status === 200) {
      this.setState({ categories: response.data });
    }

    permissions = await Permissions.askAsync(Permissions.LOCATION);
    if (permissions.status !== 'granted') {
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

  async handleSubmit() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const { selectedCategory, description, region } = this.state;

      let response;
      let attachmentId;

      if (this.state.image) {
        // Upload the image using the fetch and FormData APIs
        const formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', {
          uri: this.state.image.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        response = await axios({
          method: 'POST',
          baseURL: `${config.apiURL}/files`,
          body: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
        attachmentId = response.data;
      }
      // if (this.state.image) {
      //   response = await axios.post(`${config.apiURL}/files`, {
      //     file: this.state.image,
      //   });

      //   attachmentId = response.data;
      // }

      response = await axios.post(`${config.apiURL}/alerts`, {
        userId,
        description,
        category: selectedCategory,
        latitude: region.latitude,
        longitude: region.longitude,
        attachmentId,
      });
      if (response.status >= 300) {
        this.setState({ message: response.message, showPopup: true });
      } else {
        this.setState({ image: null });
        this.props.navigation.navigate('List');
      }
    } catch (error) {
      this.setState({ message: error.message, showPopup: true });
    }
  }

  render() {
    const { useLocation, useCamera, showCamera, categories, selectedCategory, description, region, location, showPopup, message } = this.state;
    if (useCamera && showCamera) {
      return (
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={ref => { this.camera = ref; }} >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <Button
                onPress={async () => {
                  const image = await this.camera.takePictureAsync();
                  this.setState({ image, showCamera: false });
                }}
                transparent
                style={{ marginBottom: 25 }}
              >
                <Icon style={{ color: '#fff' }} name="camera" />
              </Button>
            </TouchableOpacity>
          </View>
        </Camera>
      );
    }

    return (
      <Container style={{ paddingTop: iOS ? 15 : 0, backgroundColor: '#eeeeef' }}>
        {showPopup && <Toast text={message} show position="bottom" />}
        <Content style={{ padding: 15 }}>
          <Card style={{ marginBottom: 15 }}>
            <CardItem>
              <Form style={{ overflow: 'hidden', marginHorizontal: -20, width: '100%', flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                {!this.state.image
                  ? (
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', width: '100%' }}>
                      <Button
                        transparent
                        iconLeft
                        dark
                        onPress={() => this.setState({ showCamera: true })}
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
                        onPress={() => this.setState({ showCameraRoll: true })}
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
                  )
                  : <Image source={{ uri: this.state.image.uri }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
                }
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
                  style={{ marginTop: 15, marginBottom: 15, flex: 1, height: 200, width: '100%' }}
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
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                  <Button backgroundColor="#2196f3" onPress={this.handleSubmit}>
                    <Icon name="send" /><Text>Send alert</Text>
                  </Button>
                </View>
              </Form>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}