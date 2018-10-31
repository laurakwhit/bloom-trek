import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TrailList from '../TrailList/TrailList';
import TrailDetail from '../TrailDetail/TrailDetail';
import FlowerList from '../FlowerList/FlowerList';
import FlowerDetail from '../FlowerDetail/FlowerDetail';
import Nav from '../Nav/Nav';
import { getFlowersByMonth } from '../../utils/api';

export default class InfoContainer extends Component {
  constructor() {
    super();
    this.state = {
      flowers: [],
      selectedFlower: null,
    };
  }

  componentDidMount() {
    const { selectedPark } = this.props;

    this.getFlowers(selectedPark);
  }

  getFlowers = async (id) => {
    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const flowers = await getFlowersByMonth(id, monthNumber);

    this.setState({
      flowers,
    });
  };

  resetSelectedFlower = () => {
    this.setState({
      selectedFlower: null,
    });
  };

  goToFlowerDetails = (selectedFlower) => {
    this.setState({
      selectedFlower,
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
      updateIndex,
    } = this.props;
    const flowerInfo = flowers.find(flower => flower.id === selectedFlower);

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          {selectedIndex === 0 && !selectedFlower
            ? <FlowerList flowers={flowers} goToFlowerDetails={this.goToFlowerDetails} />
            : <View />}
          {selectedIndex === 0 && selectedFlower
            ? (
              <FlowerDetail
                flowerInfo={flowerInfo}
                resetSelectedFlower={this.resetSelectedFlower}
              />
            )
            : <View />}
          {selectedIndex === 2 && selectedTrail
            ? <TrailDetail selectedTrail={selectedTrail} resetSelectedTrail={resetSelectedTrail} />
            : <View />}
          {selectedIndex === 2 && !selectedTrail
            ? <TrailList trails={trails} handleSelectedTrail={handleSelectedTrail} /> : <View />}
        </View>
        <Nav updateIndex={updateIndex} selectedIndex={selectedIndex} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    height: '85%',
    borderColor: 'transparent',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
});

InfoContainer.propTypes = {
  trails: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  selectedPark: PropTypes.number,
  updateIndex: PropTypes.func,
  selectedTrail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object]),
  ),
  handleSelectedTrail: PropTypes.func,
  resetSelectedTrail: PropTypes.func,
};
