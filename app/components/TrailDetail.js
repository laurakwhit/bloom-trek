import React, { Component } from 'react';
import {
  StyleSheet, Text, Image, Linking, View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';

export default class TrailDetail extends Component {
  onSwipeRight() {
    const { resetSelectedTrail } = this.props;
    resetSelectedTrail();
  }

  render() {
    const { selectedTrail } = this.props;
    const {
      name, difficulty, status, summary, length, trail_url, trail_img_url,
    } = selectedTrail;
    return (
      <GestureRecognizer style={styles.container} onSwipeRight={state => this.onSwipeRight(state)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: trail_img_url }}
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.header} onPress={() => { Linking.openURL(trail_url); }}>
            {`${name}   `}
            <Image style={{ height: 18, width: 18 }} source={require('../../assets/icons/arrow.png')} />
          </Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Difficulty: </Text>{difficulty}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Length: </Text>{length} miles</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Status: </Text>{status}</Text>
          <Text style={{ marginTop: 5 }}>
            {summary}
          </Text>
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '85%',
  },
  header: {
    width: '100%',
    marginBottom: 5,
    color: '#005900',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    height: '35%',
    padding: 10,
  },
  imageContainer: {
    height: '50%',
    width: '100%',
  },
  image: {
    height: '100%',
  },
});


TrailDetail.propTypes = {
  resetSelectedTrail: PropTypes.func,
  selectedTrail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object]),
  ),
};
