import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../components/Nav';

describe('Nav', () => {
  let wrapper;
  let mockUpdateIndex;
  let selectedIndex;

  beforeEach(() => {
    mockUpdateIndex = jest.fn();
    selectedIndex = 0;
    wrapper = shallow(
      <Nav updateIndex={mockUpdateIndex} selectedIndex={selectedIndex} />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
