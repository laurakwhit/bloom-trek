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

  describe('getParks', () => {
    it('should set state with parks', async () => {
      const unformattedParks = [{
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

      await wrapper.instance().getParks();

      expect(wrapper.state().parks).toEqual(unformattedParks);
    });
  });
});
