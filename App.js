import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './app/screens/HomeScreen/HomeScreen';

export default class App extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<HomeScreen />
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
