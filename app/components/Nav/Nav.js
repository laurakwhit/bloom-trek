import React from 'react';
import { ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types';

const Nav = ({ selectedIndex, updateIndex }) => {
  const buttons = ['Flowers', 'Home', 'Trails'];

  return (
    <ButtonGroup
      onPress={updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{ flex: 1 }}
    />
  );
};

Nav.propTypes = {
  selectedIndex: PropTypes.number,
  updateIndex: PropTypes.func,
};

export default Nav;
