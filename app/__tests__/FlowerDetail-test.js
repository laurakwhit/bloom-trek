import React from 'react';
import { shallow } from 'enzyme';
import FlowerDetail from '../components/FlowerDetail/FlowerDetail';

describe('FlowerDetail', () => {
  let mockResetSelectedFlower;
  let wrapper;
  let mockFlowerInfo;

  beforeEach(() => {
    mockResetSelectedFlower = jest.fn();
    mockFlowerInfo = {
      id: 71,
      flower_img_url: 'http://extension.colostate.edu/county/jeffco/natural/plant_images/linaria_vulgaris_298x400.jpg',
      name: 'Butter And Eggs',
      common_name: 'Yellow Toadflax',
      scientific_name: 'Linaria vulgaris',
      description: 'Leaves glabrous (smooth, hairless) and glaucous (contains white waxy covering).',
      bloom_start: 6,
      bloom_end: 10,
      habitat: 'Open areas around former homesteads.',
    };
    wrapper = shallow(
      <FlowerDetail
        flowerInfo={mockFlowerInfo}
        resetSelectedFlower={mockResetSelectedFlower}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSwipeRight', () => {
    it('should invoke resetSelectedFlower when invoked', () => {
      wrapper.instance().onSwipeRight();

      expect(mockResetSelectedFlower).toHaveBeenCalled();
    });
  });
});
