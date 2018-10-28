import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

describe('HomeScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeScreen />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
