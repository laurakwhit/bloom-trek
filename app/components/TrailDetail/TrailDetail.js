import React, { Component } from 'react';
import {
  StyleSheet, Text, Image, Linking,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';

export default class TrailDetail extends Component {
  onSwipeRight() {
    const { resetSelectedTrail } = this.props;
    resetSelectedTrail();
  }

  render() {
    const { trailInfo } = this.props;
    const {
      name, difficulty, status, summary, length, trail_url, trail_img_url,
    } = trailInfo;
    return (
      <GestureRecognizer style={styles.container} onSwipeRight={state => this.onSwipeRight(state)}>
        <Text onPress={() => { Linking.openURL(trail_url); }}>{name}</Text>
        <Text>Difficulty: {difficulty}</Text>
        <Text>Length: {length} miles</Text>
        <Text>Status: {status}</Text>
        <Text style={{ marginBottom: 10 }}>
          {summary}
        </Text>
        <Image
          style={styles.image}
          source={{ uri: trail_img_url }}
        />
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 225,
  },
  image: {
    height: 50,
    width: 50,
  },
});


TrailDetail.propTypes = {
  resetSelectedTrail: PropTypes.func,
  trailInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};
