import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TrailList from '../TrailList/TrailList';
import TrailDetail from '../TrailDetail/TrailDetail';
import FlowerList from '../FlowerList/FlowerList';
import FlowerDetail from '../FlowerDetail/FlowerDetail';
import Nav from '../Nav/Nav'  ;
import { getFlowersByMonth } from '../../utils/api';

export default class InfoContainer extends Component {
  constructor() {
    super();
    this.state = {
      flowers: [],
      selectedFlower: null,
    };
  }

  getFlowers = async (id) => {
    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const flowers = await getFlowersByMonth(id, 5);

    this.setState({
      flowers
    });
  };

  componentDidMount() {
    const { selectedPark } = this.props;

    this.getFlowers(selectedPark);
  }

  resetSelectedFlower = () => {
    this.setState({
      selectedFlower: null
    });
  };

  goToFlowerDetails = (selectedFlower) => {
    this.setState({
      selectedFlower
    });
  };

  render() {
    const { flowers, selectedFlower } = this.state;
    const {
      trails, 
      selectedTrail, 
      handleSelectedTrail, 
      resetSelectedTrail,
      selectedIndex, 
      updateIndex
    } = this.props;
    const flowerInfo = flowers.find(flower => flower.id === selectedFlower);

    return (
      <View style={styles.container}>
        {selectedIndex === 0 && !selectedFlower
          ? <FlowerList flowers={flowers} goToFlowerDetails={this.goToFlowerDetails} />
          : <View />}
        {selectedIndex === 0 && selectedFlower
          ? <FlowerDetail flowerInfo={flowerInfo} resetSelectedFlower={this.resetSelectedFlower} />
          : <View />}
        {selectedIndex === 2 && selectedTrail
          ? <TrailDetail selectedTrail={selectedTrail} resetSelectedTrail={resetSelectedTrail} />
          : <View />}
        {selectedIndex === 2 && !selectedTrail
          ? <TrailList trails={trails} handleSelectedTrail={handleSelectedTrail} /> : <View />}
        <Nav updateIndex={updateIndex} selectedIndex={selectedIndex} />
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
  trails: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  updateIndex: PropTypes.func,
  selectedTrail: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  handleSelectedTrail: PropTypes.func,
  resetSelectedTrail: PropTypes.func,
};
