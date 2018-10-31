import React from 'react';
import { shallow } from 'enzyme';
import TrailDetail from '../components/TrailDetail';

/* global spyOn */

describe('TrailDetail', () => {
  let mockResetSelectedTrail;
  let mockSelectedTrail;
  let wrapper;

  beforeEach(() => {
    mockResetSelectedTrail = jest.fn();
    mockSelectedTrail = {
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
    };
    wrapper = shallow(
      <TrailDetail
        selectedTrail={mockSelectedTrail}
        resetSelectedTrail={mockResetSelectedTrail}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSwipeRight', () => {
    it('should invoke resetSelectedTrail when invoked', () => {
      wrapper.instance().onSwipeRight();

      expect(mockResetSelectedTrail).toHaveBeenCalled();
    });
  });

  it('should invoke onSwipeRight on right swipe', () => {
    const spy = spyOn(wrapper.instance(), 'onSwipeRight');
    wrapper.instance().forceUpdate();

    wrapper.find('GestureRecognizer').props().onSwipeRight();

    expect(spy).toHaveBeenCalled();
  });
});
