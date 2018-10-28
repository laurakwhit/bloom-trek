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

  it('should set state when input is changed', () => {
    wrapper.setState({ searchInput: 'aspen' });

    expect(wrapper.state().searchInput).toEqual('aspen');
  });

  describe('handleCancel', () => {
    it('should set state when invoked', () => {
      wrapper.setState({ searchInput: 'aspen' });
      expect(wrapper.state().searchInput).toBe('aspen');

      wrapper.instance().handleCancel();

      expect(wrapper.state().searchInput).toBe('');
    });
  });

  describe('handleChangeText', () => {
    it('should set state when invoked', () => {
      const input = 'boulder';
      wrapper.instance().handleChangeText(input);

      expect(wrapper.state().searchInput).toBe('boulder');
    });
  });

  describe('handleSubmit', () => {
    it('should invoke updateLocation when called', () => {
      wrapper.setState({ searchInput: 'aspen' });
      wrapper.instance().handleSubmit();

      expect(mockUpdateLocation).toHaveBeenCalled();
    });
  });
});
