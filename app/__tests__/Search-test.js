import React from 'react';
import { shallow } from 'enzyme';
import Search from '../components/Search/Search';

describe('Search', () => {
  let wrapper;
  let mockUpdateLocation;

  beforeEach(() => {
    mockUpdateLocation = jest.fn();
    wrapper = shallow(
      <Search updateLocation={mockUpdateLocation} />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
