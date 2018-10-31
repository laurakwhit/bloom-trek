import React from 'react';
import { shallow } from 'enzyme';
import Map from '../components/Map/Map';

describe('Map', () => {
  let wrapper;
  let mockHandleSelectedPark;
  let mockHandleSelectedTrail;

  beforeEach(() => {
    mockHandleSelectedPark = jest.fn();
    mockHandleSelectedTrail = jest.fn();
    wrapper = shallow(
      <Map
        handleSelectedPark={mockHandleSelectedPark}
        handleSelectedTrail={mockHandleSelectedTrail}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleParkMarkerPress', () => {
    it('should invoke handeSelectedPark when called', () => {
      wrapper.instance().handleParkMarkerPress();

      expect(mockHandleSelectedPark).toHaveBeenCalled();
    });
  });

  describe('HandleTrailMarkerPress', () => {
    it('should invoke handleSelectedTrail', () => {
      wrapper.instance().handleTrailMarkerPress();

      expect(mockHandleSelectedTrail).toHaveBeenCalled();
    });
  });
});
