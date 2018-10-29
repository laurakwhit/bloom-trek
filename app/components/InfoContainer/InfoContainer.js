import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TrailList from '../TrailList/TrailList';
import TrailDetail from '../TrailDetail/TrailDetail';
import Nav from '../Nav/Nav';

export default class InfoContainer extends Component {
  constructor() {
    super();
    this.state = {
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
    const { selectedIndex, updateIndex } = this.props;
    const {
      trails, selectedTrail, handleSelectedTrail, resetSelectedTrail,
    } = this.props;

    return (
      <View style={styles.container}>
        {selectedIndex === 2 && selectedTrail
          ? <TrailDetail selectedTrail={selectedTrail} resetSelectedTrail={resetSelectedTrail} />
          : <View />}
        {selectedIndex === 0 ? <Text style={styles.list}>{selectedIndex}</Text> : <View />}
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
