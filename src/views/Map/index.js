import React from 'react';
import { Icon } from 'native-base';
import { MapView, Location, Permissions } from 'expo';


export default class MapPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map" style={{ color: tintColor }} />
    ),
  };

  state = {
    coords: {
      latitude: 50.0676592,
      longitude:  19.988532,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    useLocation: true,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ useLocation: false });
    } else {
      const { coords } = await Location.getCurrentPositionAsync({});
      this.setState({
        coords: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    }
  }

  render() {
    return (
      <MapView
        loadingBackgroundColor="#efefef"
        style={{ flex: 1 }}
        loadingEnabled
        showsPointsOfInterest
        showsMyLocationButton
        showsUserLocation
        showsCompass
        showsScale
        showsBuildings
        initialRegion={this.state.useLocation ? this.state.coords : {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 50.0676592,
            longitude:  19.988532,
          }}
          title="title"
          description="description"
          pinColor="#009c00"
        />
      </MapView>
    );
  }
}
