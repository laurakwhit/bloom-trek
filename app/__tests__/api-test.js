import React from 'react';
import { shallow } from 'enzyme';
import { getAllParks, getParkTrails, getFlowersByMonth } from '../utils/api';

describe('API', () => {
  describe('getAllParks', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve([{
          id: 1,
          name: 'Castlewood Canyon',
          coords: {
            latitude: 39.3379,
            longitude: -104.7512,
          },
        }]),
      }));
    });
    it('should be invoked with correct params', async () => {
      const url = 'https://bloom-trek-api.herokuapp.com/api/v1/parks/';

      await getAllParks();

      expect(window.fetch).toHaveBeenCalledWith(url);
    });
  });
});
