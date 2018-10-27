import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '../../components/Map/Map';

export default class HomeScreen extends Component {
	state = {
		parks: [{ name: 'Denver', coords: {latitude: 39.7460095, longitude: -105.00756590000003} }]
	};

	render() {
		const { parks } = this.state;

		return (
			<View style={{ flex: 7 }}>
				<Map parks={parks} />
			</View>
		);
	}
}

const styles = {

};
