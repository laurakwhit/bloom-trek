import React from 'react';
import { shallow, mount } from 'enzyme';
import { MapView } from 'expo';
import Map from '../components/Map';

describe('Map', () => {
  let wrapper;
  let mockHandleSelectedPark;
  let mockHandleSelectedTrail;
  let mockParks;
  let mockTrails;

  beforeEach(() => {
    mockHandleSelectedPark = jest.fn();
    mockHandleSelectedTrail = jest.fn();
    wrapper = shallow(
      <Map
        handleSelectedPark={mockHandleSelectedPark}
        handleSelectedTrail={mockHandleSelectedTrail}
      />,
    );
    mockParks = [{
      id: 1,
      name: 'Castlewood Canyon',
      coords: {
        latitude: 39.3379,
        longitude: -104.7512,
      },
    }];
    mockTrails = [{
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
