import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Map from '../../components/Map/Map';

export default class HomeScreen extends Component {
	state = {
		coffeeShops: [{ name: 'Denver', coords: {latitude: 39.7460095, longitude: -105.00756590000003} }]
	};

	render() {
		const { coffeeShops } = this.state;

		return (
			<View style={{ flex: 7 }}>
				<Map places={coffeeShops} />
			</View>
		);
	}
}

const styles = {

};
