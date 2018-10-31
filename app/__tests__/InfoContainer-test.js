import React from 'react';
import { shallow } from 'enzyme';
import InfoContainer from '../components/InfoContainer';

describe('InfoContainer', () => {
  let mockSelectedMonth;
  let mockFlowers;
  let wrapper;

  beforeEach(() => {
    mockSelectedMonth = 5;
    mockFlowermockS = [{
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
        mockSelectedMonth={mockSelectedMonth}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
