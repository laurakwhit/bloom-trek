import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';

const initialRegion = {
  latitude: 39.739,
  longitude: -104.99,
};

const { Marker } = MapView;

export default class Map extends Component {
  handleMarkerPress = (id) => {
    const { handleSelectedPark } = this.props;
    handleSelectedPark(id);
  };

  renderMarkers = () => {
    const { parks } = this.props;
    return parks.map(park => (
      <Marker
        key={park.id}
        title={park.name}
        coordinate={park.coords}
        onPress={() => this.handleMarkerPress(park.id)}
      />
    ));
  };

  render() {
    const { location, deltas } = this.props;
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
        {this.renderMarkers()}
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
  location: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  deltas: PropTypes.objectOf(PropTypes.number),
};
