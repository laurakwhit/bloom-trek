import React from 'react';
import { shallow } from 'enzyme';
import { getAllParks, getParkTrails, getFlowersByMonth } from '../utils/api';

describe('API', () => {
  describe('getAllParks', () => {
    let mockPark;

    beforeEach(() => {
      mockPark = [{
        id: 1,
        name: 'Castlewood Canyon',
        coords: {
          latitude: 39.3379,
          longitude: -104.7512,
        },
      }];
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockPark),
      }));
    });
    it('should be invoked with correct params', async () => {
      const url = 'https://bloom-trek-api.herokuapp.com/api/v1/parks/';

      await getAllParks();

      expect(window.fetch).toHaveBeenCalledWith(url);
    });

    it('should return an array if status code is ok', async () => {
      const result = await getAllParks();

      expect(result).toEqual(mockPark);
    });

  describe('getParkTrails', () => {
    let mockTrail;

    beforeEach(() => {
      mockTrail = [{
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
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockTrail),
      }));
    });

    it('should be invoked with correct params', async () => {
      const id = 1;
      const url = `https://bloom-trek-api.herokuapp.com/api/v1/parks/${id}/trails`;
      await getParkTrails(id);

      expect(window.fetch).toHaveBeenCalledWith(url);
    });
  });
});
