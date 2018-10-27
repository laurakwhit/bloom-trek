import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '../../components/Map/Map';
import { Location, Permissions } from 'expo';

export default class HomeScreen extends Component {
	state = {
		location: null,
		errorMessage: null,
		parks: [{ name: 'Denver', coords: {latitude: 39.7460095, longitude: -105.00756590000003} }]
	};

	componentDidMount() {
		this.getCurrentLocation()
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

	render() {
		const { location, parks } = this.state;

		return (
			<View style={{ flex: 7 }}>
				<Map location={location} parks={parks} />
			</View>
		);
	}
}

const styles = {

};
