import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types';

const Nav = ({ selectedIndex, updateIndex }) => {
  const flowers = () => <Image style={styles.icon} source={require('../../assets/icons/flower.png')} />;
  const home = () => <Image style={styles.icon} source={require('../../assets/icons/map.png')} />;
  const trails = () => <Image style={styles.icon} source={require('../../assets/icons/trails.png')} />;
  const buttons = [{ element: flowers }, { element: home }, { element: trails }];

  return (
    <ButtonGroup
      onPress={updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{
        height: '15%',
        borderWidth: 0,
        width: '100%',
        marginLeft: 0,
        marginTop: 0,
      }}
      innerBorderStyle={{ color: 'transparent' }}
      buttonStyle={{
        opacity: 0.5,
      }}
      selectedButtonStyle={{
        opacity: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
});

Nav.propTypes = {
  selectedIndex: PropTypes.number,
  updateIndex: PropTypes.func,
};

export default Nav;
