import React from 'react';
import { shallow } from 'enzyme';
import TrailList from '../components/TrailList';

describe('TrailList', () => {
  let wrapper;
  let mockTrails;
  let mockHandleSelectedTrail;

  beforeEach(() => {
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
    mockHandleSelectedTrail = jest.fn();
    wrapper = shallow(
      <TrailList
        trails={mockTrails}
        handleSelectedTrail={mockHandleSelectedTrail}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should should invoke handleSelectedTrail onPress', () => {
    wrapper.find('TouchableOpacity').props().onPress();

    expect(mockHandleSelectedTrail).toHaveBeenCalled();
  });
});
