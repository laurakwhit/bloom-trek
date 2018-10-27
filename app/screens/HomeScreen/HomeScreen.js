import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '../../components/Map/Map';
import Search from '../../components/Search/Search';
import { Location, Permissions } from 'expo';
import { getAllParks } from '../../utils/api';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_KEY } from '../../../key';

Geocoder.init(GOOGLE_KEY);

export default class HomeScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    parks: [],
    selectedPark: null,
  };

  componentDidMount() {
    this.getCurrentLocation();
    this.getParks();
  }

  getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied...',
      });
    }

    const position = await Location.getCurrentPositionAsync({});
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    this.setState({ location });
  };

  getParks = async () => {
    const unformattedParks = await getAllParks();
    const parks = unformattedParks.map(park => ({
      id: park.id,
      name: park.name,
      coords: {
        latitude: park.latitude,
        longitude: park.longitude,
      },
    }));
    this.setState({ parks });
  };

  handleSelectedPark = (id) => {
    this.setState({ selectedPark: id });
	};
	
	updateLocation = (input) => {
    Geocoder.from(input)
      .then((json) => {
        const { location } = json.results[0].geometry;
        const { lat, lng } = location;
        this.setState({
          location: {
						latitude: lat,
						longitude: lng
					}
        });
      })
      .catch(error => console.warn(error));
  };

  render() {
    const { location, parks } = this.state;

    return (
      <View style={styles.container}>
				<Search updateLocation={this.updateLocation} />
        <Map
          location={location}
          parks={parks}
          handleSelectedPark={this.handleSelectedPark}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
  },
});
