import React from 'react';
import { Icon } from 'native-base';
import { MapView, Location, Permissions } from 'expo';

import config from '../../../config';

export default class MapPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map" style={{ color: tintColor }} />
    ),
  };

  constructor(props) {
    super(props);
    this.getAlerts = this.getAlerts.bind(this);
  }

  state = {
    coords: {
      latitude: 50.0676592,
      longitude:  19.988532,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    useLocation: true,
    alerts: [],
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

    this.getAlerts();
  }

  getAlerts() {
    this.setState({
      alerts: [{
        latitude: 50.0676592,
        longitude:  19.988532,
        category: 'pollution',
      }, {
        latitude: 50.073956,
        longitude: 19.982212,
        category: 'violence',
      }, {
        latitude: 50.062254,
        longitude:  20.005492,
        category: 'danger',
      }],
    });
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
        {this.state.alerts.map((alert, i) => (
          <MapView.Marker
            key={`alert-${i}`}
            coordinate={{
              latitude: alert.latitude,
              longitude: alert.longitude,
            }}
            pinColor={config.alarmColors[alert.category.toLowerCase()]}
          />
        ))}
      </MapView>
    );
  }
}
