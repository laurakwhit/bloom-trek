import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';

const MonthSlider = ({ selectedMonth, updateMonth }) => {
  const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <View style={styles.slider}>
      <Slider
        maximumValue={12}
        minimumValue={1}
        value={selectedMonth}
        step={1}
        onValueChange={value => updateMonth(value)}
        thumbStyle={styles.sliderThumb}
      />
      <Text style={styles.sliderText}>{months[selectedMonth - 1]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: '10%',
    alignItems: 'stretch',
    justifyContent: 'center',
    top: 100,
    marginLeft: '5%',
    width: '90%',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  sliderThumb: {
    backgroundColor: '#000',
  },
  sliderText: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontFamily: 'bloom',
  },
});

MonthSlider.propTypes = {
  selectedMonth: PropTypes.number,
  updateMonth: PropTypes.func,
};

export default MonthSlider;
