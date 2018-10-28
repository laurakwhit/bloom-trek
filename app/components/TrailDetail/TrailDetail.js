import React from 'react';
import {
  StyleSheet, Text, View, Image, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

const TrailDetail = ({ trailInfo }) => {
  const {
    name, difficulty, status, summary, length, trail_url, trail_img_url,
  } = trailInfo;
  return (
    <View style={styles.container}>
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
    </View>
  );
};

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
  trailInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default TrailDetail;
