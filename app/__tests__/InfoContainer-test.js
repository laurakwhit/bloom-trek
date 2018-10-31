import React from 'react';
import { shallow } from 'enzyme';
import InfoContainer from '../components/InfoContainer';
import { getFlowersByMonth } from '../utils/api';

describe('InfoContainer', () => {
  let mockSelectedMonth;
  let mockFlowers;
  let wrapper;

  beforeEach(() => {
    mockSelectedMonth = 5;
    mockFlowers = [{
      id: 71,
      flower_img_url: 'http://extension.colostate.edu/county/jeffco/natural/plant_images/linaria_vulgaris_298x400.jpg',
      name: 'Butter And Eggs',
      common_name: 'Yellow Toadflax',
      scientific_name: 'Linaria vulgaris',
      description: 'Leaves glabrous (smooth, hairless) and glaucous (contains white waxy covering).',
      bloom_start: 6,
      bloom_end: 10,
      habitat: 'Open areas around former homesteads.',
    }];
    wrapper = shallow(
      <InfoContainer
        flowers={mockFlowers}
        selectedMonth={mockSelectedMonth}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getFlowers', () => {
    it('should set state flowers', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockFlowers),
      }));

      await wrapper.instance().getFlowers(1);
      expect(wrapper.state().flowers).toEqual(mockFlowers);
    });
  });

  describe('resetSelectedFlower', () => {
    it('should set state when invoked', () => {
      wrapper.setState({ selectedFlower: 1 });
      expect(wrapper.state().selectedFlower).toEqual(1);

      wrapper.instance().resetSelectedFlower();

      expect(wrapper.state().selectedFlower).toEqual(null);
    });
  });

  describe('goToFlowerDetails', () => {
    it('should set state with selected flower', () => {
      expect(wrapper.state().selectedFlower).toEqual(null);

      wrapper.instance().goToFlowerDetails(1);

      expect(wrapper.state().selectedFlower).toEqual(1);
    });
  });
});
