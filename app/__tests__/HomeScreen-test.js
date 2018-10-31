import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from '../screens/HomeScreen';

/* global spyOn */

describe('HomeScreen', () => {
  let unformattedTrails;
  let unformattedParks;
  let wrapper;

  beforeEach(() => {
    unformattedTrails = [{
      id: 1,
      name: 'Castlewood Canyon - Rimrock to Creek Bottom Loop',
      uid: 7006769,
      difficulty: 'medium',
      length: 4.6,
      status: 'All Clear',
      trail_img_url: 'https://cdn-files.apstatic.com/hike/7006325_medium_1438452681.jpg',
      trail_url: 'https://www.hikingproject.com/trail/7006769/castlewood-canyon-rimrock-to-creek-bottom-loop',
      summary: 'A fun, rolling trail with a sense of seclusion, great geology, and historical sites.',
      park_id: 1,
      coords: {
        latitude: 39.3598,
        longitude: -104.7682,
      },
    }];
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

    it('should set state when invoked', () => {
      wrapper.setState({
        selectedPark: 1,
        trails: [1, 2, 4, 5],
      });
      expect(wrapper.state().selectedPark).toEqual(1);

      wrapper.instance().resetMap();

      expect(wrapper.state().selectedPark).toEqual(null);
      expect(wrapper.state().trails).toEqual([]);
    });
  });

  describe('handleSelectedTrail', () => {
    it('should set state when invoked', () => {
      wrapper.setState({ trails: unformattedTrails });
      expect(wrapper.state().selectedTrail).toEqual(null);
      expect(wrapper.state().selectedIndex).toEqual(0);

      wrapper.instance().handleSelectedTrail(1);

      expect(wrapper.state().selectedTrail).toEqual(...unformattedTrails);
      expect(wrapper.state().selectedIndex).toEqual(2);
    });
  });

  describe('resetSelectedTrail', () => {
    it('should set state when invoked', () => {
      wrapper.setState({ selectedTrail: unformattedTrails });
      expect(wrapper.state().selectedTrail).toEqual(unformattedTrails);

      wrapper.instance().resetSelectedTrail();

      expect(wrapper.state().selectedTrail).toEqual(null);
    });
  });

  describe('updateIndex', () => {
    it('should set state with selectedIndex', () => {
      wrapper.setState({ selectedIndex: 0 });
      expect(wrapper.state().selectedIndex).toEqual(0);

      wrapper.instance().updateIndex(2);

      expect(wrapper.state().selectedIndex).toEqual(2);
    });

    it('should set state selectedIndex 0 if selectedIndex is 1', () => {
      wrapper.setState({ selectedIndex: 0 });
      expect(wrapper.state().selectedIndex).toEqual(0);

      wrapper.instance().updateIndex(1);

      expect(wrapper.state().selectedIndex).toEqual(0);
    });
  });

  describe('updateMonth', () => {
    it('should set state selectedMonth', () => {
      wrapper.setState({ selectedMonth: 1 });
      expect(wrapper.state().selectedMonth).toEqual(1);

      wrapper.instance().updateMonth(3);

      expect(wrapper.state().selectedMonth).toEqual(3);
    });
  });
});
