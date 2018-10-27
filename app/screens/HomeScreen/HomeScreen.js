import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Location, Permissions } from 'expo';
import Map from '../../components/Map/Map';
import { getAllParks } from '../../utils/api';

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

  render() {
    const { location, parks } = this.state;

    return (
      <View style={styles.container}>
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
