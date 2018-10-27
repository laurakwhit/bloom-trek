import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Nav extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
  },
});
