import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';

const deltas = {
	latitudeDelta: 1,
	longitudeDelta: 1
};

const initialRegion = {
	latitude: 39.739,
  longitude: -104.99,
};

const Marker = MapView.Marker;

export default class Map extends Component {

	renderMarkers = () => {
		return this.props.parks.map((park, i) => (
			<Marker key={i} title={park.name} coordinate={park.coords} onPress={() => this.props.handleSelectedPark(park.id)}/>
		));
	}

	render() {
		const region = {
			...this.props.location,
      ...deltas
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
		width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
	}
});
