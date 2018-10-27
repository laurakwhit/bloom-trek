import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './app/screens/HomeScreen/HomeScreen';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<HomeScreen />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
