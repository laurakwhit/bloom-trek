import React, { Component } from 'react';
import {
  StyleSheet, Text, Image, View, ScrollView,
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: flower_img_url }}
          />
        </View>
        <ScrollView style={styles.text}>
          <Text style={styles.info}><Text style={styles.emphasis}>Name: </Text>{name}</Text>
          <Text style={styles.info}><Text style={styles.emphasis}>Scientific Name: </Text>{scientific_name}</Text>
          <Text style={styles.info}><Text style={styles.emphasis}>Habitat: </Text>{habitat}</Text>
          <Text style={styles.info}><Text style={styles.emphasis}>Description: </Text>{description}</Text>
        </ScrollView>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '85%',
  },
  emphasis: {
    color: '#b55760',
    fontSize: 15,
    fontWeight: 'bold',
  },
  info: {
    marginBottom: 5,
  },
  text: {
    height: '35%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    marginBottom: 10,
  },
  imageContainer: {
    height: '50%',
    width: '100%',
  },
  image: {
    height: '100%',
  },
});

FlowerDetail.propTypes = {
  resetSelectedFlower: PropTypes.func,
  flowerInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};
