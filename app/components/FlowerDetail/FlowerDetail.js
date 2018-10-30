import React, { Component } from 'react';
import {
  StyleSheet, Text, Image,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';

export default class FlowerDetail extends Component {
  onSwipeRight() {
    const { resetSelectedFlower } = this.props;
    resetSelectedFlower();
  }

  render() {
    const { flowerInfo } = this.props;
    const {
      flower_img_url,
      name,
      scientific_name,
      description,
      habitat,
    } = flowerInfo;

    return (
      <GestureRecognizer style={styles.container} onSwipeRight={state => this.onSwipeRight(state)}>
        <Text>Name: {name}</Text>
        <Text>Scientific Name: {scientific_name}</Text>
        <Text>Habitat: {habitat}</Text>
        <Text>Description: {description}</Text>
        <Image
          style={StyleSheet.image}
          source={{ uri: flower_img_url }}
        />
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '85%',
  },
  image: {
    height: 50,
    width: 50,
  },
});

FlowerDetail.propTypes = {
  resetSelectedFlower: PropTypes.func,
  flowerInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};
