import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';

const initialRegion = {
  latitude: 39.739,
  longitude: -104.99,
};

const { Marker, Circle } = MapView;

export default class Map extends Component {
  handleParkMarkerPress = (id) => {
    const { handleSelectedPark } = this.props;
    handleSelectedPark(id);
  };

  handleTrailMarkerPress = (id) => {
    const { handleSelectedTrail } = this.props;
    handleSelectedTrail(id);
  };

  renderParkMarkers = () => {
    const { parks } = this.props;
    return parks.map(park => (
      <Marker
        key={park.id}
        title={park.name}
        coordinate={park.coords}
        image={require('../../assets/icons/park-pin.png')}
        onPress={() => this.handleParkMarkerPress(park.id)}
      />
    ));
  };

  renderTrailMarkers = () => {
    const { trails } = this.props;
    return trails.map(trail => (
      <Marker
        key={trail.id}
        title={trail.name}
        coordinate={trail.coords}
        onPress={() => this.handleTrailMarkerPress(trail.id)}
      >
        <Image source={require('../../assets/icons/trail-pin.png')} style={{ width: 40, height: 40 }} />
      </Marker>
    ));
  }

  renderParkRadius = () => {
    const { parkArea } = this.props;
    const { latitude, longitude } = parkArea.coords;
    return (
      <Circle
        center={{
          latitude,
          longitude,
        }}
        radius={16093.4}
        strokeWidth={0}
        strokeColor="transparent"
        fillColor="rgba(0,89,0,0.2)"
        z-index={-10}
      />
    );
  }

  render() {
    const { location, deltas, selectedPark } = this.props;
    const region = {
      ...location,
      ...deltas,
    };

    if (!region.latitude || !region.longitude) {
      return (
        <View style={styles.container}>
          <Text>Loading map...</Text>
        </View>
      );
    }

    return (
      <MapView
        style={styles.container}
        region={region}
        initialRegion={{ ...initialRegion, ...deltas }}
        showsUserLocation
        showsMyLocationButton
      >
        {this.renderParkMarkers()}
        {this.renderTrailMarkers()}
        {selectedPark ? this.renderParkRadius() : <View />}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Map.propTypes = {
  parks: PropTypes.arrayOf(PropTypes.object),
  handleSelectedPark: PropTypes.func,
  handleSelectedTrail: PropTypes.func,
  location: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  deltas: PropTypes.objectOf(PropTypes.number),
  trails: PropTypes.arrayOf(PropTypes.object),
  parkArea: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  ),
  selectedPark: PropTypes.number,
};
