import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getParkTrails } from '../../utils/api';
import TrailList from '../TrailList/TrailList';
import TrailDetail from '../TrailDetail/TrailDetail';
import Nav from '../Nav/Nav';

export default class InfoContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      trails: [],
      selectedTrail: null,
      selectedFlower: null,
    };
  }

  resetSelectedTrail = () => {
    this.setState({ selectedTrail: null });
  }

  updateIndex = async (selectedIndex) => {
    const { resetMap, selectedPark } = this.props;
    const { trails } = this.state;

    this.setState({ selectedIndex });
    if (selectedIndex === 1) {
      resetMap();
      this.setState({ trails: [] });
    }
    if (selectedIndex === 2 && !trails.length) {
      const parkTrails = await getParkTrails(selectedPark);
      this.setState({ trails: parkTrails });
    }
  };

  goToTrailDetails = (selectedTrail) => {
    this.setState({ selectedTrail });
  }

  render() {
    const { selectedIndex, trails, selectedTrail } = this.state;
    const trailInfo = trails.find(trail => trail.id === selectedTrail);

    return (
      <View style={styles.container}>
        {selectedIndex === 2 && selectedTrail
          ? <TrailDetail trailInfo={trailInfo} resetSelectedTrail={this.resetSelectedTrail} />
          : <View />}
        {selectedIndex === 0 ? <Text style={styles.list}>{selectedIndex}</Text> : <View />}
        {selectedIndex === 2 && !selectedTrail
          ? <TrailList trails={trails} goToTrailDetails={this.goToTrailDetails} /> : <View />}
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
    height: 225,
  },
});

InfoContainer.propTypes = {
  selectedPark: PropTypes.number,
  resetMap: PropTypes.func,
};
