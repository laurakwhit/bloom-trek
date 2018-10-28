import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getParkTrails } from '../../utils/api';
import TrailList from '../TrailList/TrailList';
import Nav from '../Nav/Nav';

export default class InfoContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      trails: [],
    };
  }

  updateIndex = async (selectedIndex) => {
    const { resetMap, selectedPark } = this.props;

    this.setState({ selectedIndex });
    if (selectedIndex === 1) {
      resetMap();
      this.setState({ trails: [] });
    }
    if (selectedIndex === 2 && !this.state.trails.length) {
      const trails = await getParkTrails(selectedPark);
      this.setState({ trails });
    }
  };

  render() {
    const { selectedIndex, trails } = this.state;

    return (
      <View style={styles.container}>
        {selectedIndex === 0 ? <Text style={styles.list}>{selectedIndex}</Text> : <View />}
        {selectedIndex === 2 ? <TrailList style={styles.list} trails={trails} /> : <View />}
        <Nav updateIndex={this.updateIndex} selectedIndex={selectedIndex} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 5,
  },
});

InfoContainer.propTypes = {
  selectedPark: PropTypes.number,
  resetMap: PropTypes.func,
};
