import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    const buttons = ['Flowers', 'Home', 'Trails'];
    const { selectedIndex } = this.state;

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ flex: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
  },
});
