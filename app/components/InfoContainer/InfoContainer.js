import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from '../Nav/Nav';

export default class InfoContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.selectedPark}</Text>
        <Nav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    flex: 5,
  },
});
