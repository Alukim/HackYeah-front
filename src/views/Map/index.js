import React from 'react';
import { Icon } from 'native-base';
import { MapView, Location, Permissions } from 'expo';

import config from '../../../config';
import MarkerContent from './MarkerContent';

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
    this.getCurrentAlert = this.getCurrentAlert.bind(this);
  }

  state = {
    region: {
      latitude: 50.0676592,
      longitude:  19.988532,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    currentAlert: null,
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
        region: {
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
        id: 1,
        latitude: 50.0676592,
        longitude:  19.988532,
        category: 'pollution',
      }, {
        id: 2,
        latitude: 50.073956,
        longitude: 19.982212,
        category: 'violence',
      }, {
        id: 3,
        latitude: 50.062254,
        longitude:  20.005492,
        category: 'danger',
      }],
    });
  }

  getCurrentAlert(id) {
    this.setState({
      currentAlert: {
        id,
        userName: 'Stefano123',
        location: 'Tauron Arena, Kraków',
        category: 'danger',
        description: 'Elit reprehenderit esse id quis dolore aliqua magna.',
      },
    });
  }

  render() {
    const { currentAlert, alerts, useLocation, region } = this.state;
    return (
      <MapView
        loadingBackgroundColor="#efefef"
        style={{ flex: 1 }}
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
      >
        {alerts.map(alert => (
          <MapView.Marker
            key={`alert-${alert.id}`}
            coordinate={{
              latitude: alert.latitude,
              longitude: alert.longitude,
            }}
            pinColor={config.alertColors[alert.category.toLowerCase()]}
            onPress={() => this.getCurrentAlert(alert.id)}
          >
            {currentAlert && (
              <MapView.Callout>
                <MarkerContent cardData={currentAlert} />
              </MapView.Callout>
            )}
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}
