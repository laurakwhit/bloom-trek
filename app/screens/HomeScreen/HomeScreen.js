import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding';
import Map from '../../components/Map/Map';
import Search from '../../components/Search/Search';
import InfoContainer from '../../components/InfoContainer/InfoContainer';
import { getAllParks } from '../../utils/api';
import { GOOGLE_KEY } from '../../../key';

Geocoder.init(GOOGLE_KEY);

export default class HomeScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    parks: [],
    selectedPark: null,
    deltas: {
      latitudeDelta: 1,
      longitudeDelta: 1,
    },
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
    const parks = await getAllParks();
    this.setState({ parks });
  };

  handleSelectedPark = (id) => {
    const { parks } = this.state;
    const matchingPark = parks.find(park => park.id === id);
    this.setState({
      selectedPark: id,
      location: matchingPark.coords,
      deltas: {
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    });
  };

  resetMap = () => {
    this.getCurrentLocation();
    this.setState({
      selectedPark: null,
      deltas: {
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
    });
  };

  updateLocation = (input) => {
    Geocoder.from(input)
      .then((json) => {
        const { location } = json.results[0].geometry;
        const { lat, lng } = location;
        this.setState({
          location: {
            latitude: lat,
            longitude: lng,
          },
        });
      })
      .catch(error => console.warn(error));
  };

  render() {
    const {
      location, parks, selectedPark, deltas,
    } = this.state;
    return (
      <View style={styles.container}>
        <Search updateLocation={this.updateLocation} />
        <Map
          location={location}
          parks={parks}
          deltas={deltas}
          handleSelectedPark={this.handleSelectedPark}
        />
        {selectedPark ? (
          <InfoContainer selectedPark={selectedPark} resetMap={this.resetMap} />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
