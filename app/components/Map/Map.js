import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';

const deltas = {
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};

const initialRegion = {
	latitude: 39.739,
  longitude: -104.99,
};

const Marker = MapView.Marker;

export default class Map extends Component {

	renderMarkers() {
		return this.props.places.map((place, i) => (
			<Marker key={i} title={place.name} coordinate={place.coords} />
		));
	}

	render() {
		const region = {
			latitude: 39.739,
      longitude: -104.99,
      ...deltas
		};

		if (!region.latitude || !region.longitude) {
			return (
				<View>
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
		width: '100%',
		height: '100%'
	}
});
