import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from '../screens/HomeScreen';

/* global spyOn */

describe('HomeScreen', () => {
  let unformattedParks;
  let wrapper;

  beforeEach(() => {
    unformattedParks = [{
      id: 1,
      name: 'Castlewood Canyon',
      coords: {
        latitude: 39.3379,
        longitude: -104.7512,
      },
    }];
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(unformattedParks),
    }));
    wrapper = shallow(<HomeScreen />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getParks', () => {
    it('should set state with parks', async () => {
      await wrapper.instance().getParks();

      expect(wrapper.state().parks).toEqual(unformattedParks);
    });
  });

  describe('handleSelectedPark', () => {
    it('should set state when invoked ', async () => {
      wrapper.setState({ parks: unformattedParks });
      await wrapper.instance().handleSelectedPark(1);

      expect(wrapper.state().selectedPark).toEqual(1);
      expect(wrapper.state().selectedTrail).toEqual(null);
      expect(wrapper.state().trails).toEqual(unformattedParks);
    });
  });

  describe('resetMap', () => {
    it('should invoke getCurrentLocation when called', () => {
      const spy = spyOn(wrapper.instance(), 'getCurrentLocation');

      wrapper.instance().resetMap();

      expect(spy).toHaveBeenCalled();
    });
  });
});
