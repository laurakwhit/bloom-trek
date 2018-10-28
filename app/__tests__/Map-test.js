import React from 'react';
import { shallow } from 'enzyme';
import Map from '../components/Map/Map';

describe('Map', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Map />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
