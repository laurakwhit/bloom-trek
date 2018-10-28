import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default class Nav extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     selectedIndex: 0,
  //   };
  // }

  // updateIndex = (selectedIndex) => {
  //   this.setState({ selectedIndex });
  //   if (selectedIndex === 1) {
  //     this.props.resetMap();
  //   }
  // };

  render() {
    const buttons = ['Flowers', 'Home', 'Trails'];
    const { selectedIndex, updateIndex } = this.props;

    return (
      <ButtonGroup
        onPress={updateIndex}
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
