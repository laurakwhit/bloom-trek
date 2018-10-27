import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../components/Map/Map';

describe('Map', () => {
  it('should match snapshot', () => {
    const wrapper = renderer.create(<Map />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
