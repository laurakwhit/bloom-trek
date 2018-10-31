import React from 'react';
import { shallow } from 'enzyme';
import FlowerList from '../components/FlowerList/FlowerList';

describe('FlowerList', () => {
  let wrapper;
  let mockFlowers;
  let mockGoToFlowerDetails;

  beforeEach(() => {
    mockGoToFlowerDetails = jest.fn();
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
      <FlowerList
        goToFlowerDetails={mockGoToFlowerDetails}
        flowers={mockFlowers}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke goToFlowerDetails onPress', () => {
    wrapper.find('TouchableOpacity').props().onPress();

    expect(mockGoToFlowerDetails).toHaveBeenCalled();
  });
});
