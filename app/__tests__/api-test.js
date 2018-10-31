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

    it('should throw error status code not ok', async () => {
      const errorMessage = new Error({ message: 'failed' });
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(errorMessage));

      await expect(getAllParks()).rejects.toEqual(errorMessage);
    });
  });

  describe('getParkTrails', () => {
    let id;
    let mockTrail;

    beforeEach(() => {
      id = 1;
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
      const url = `https://bloom-trek-api.herokuapp.com/api/v1/parks/${id}/trails`;
      await getParkTrails(id);

      expect(window.fetch).toHaveBeenCalledWith(url);
    });

    it('should return an array if status code is ok', async () => {
      const result = await getParkTrails(id);

      expect(result).toEqual(mockTrail);
    });

    it('should throw error if status code not ok', async () => {
      const errorMessage = new Error({ message: 'failed' });
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(errorMessage));

      await expect(getParkTrails()).rejects.toEqual(errorMessage);
    });
  });

  describe('getFlowersByMonth', () => {
    let id;
    let month;
    let mockFlower;

    beforeEach(() => {
      id = 1;
      month = 5;
      mockFlower = [{
        id: 1,
        flower_img_url: 'http://extension.colostate.edu/county/jeffco/natural/plant_images/adenolinum_lewisii_1_378x400.jpg',
        name: 'Wild Blue Flax',
        common_name: 'Blue Flax',
        scientific_name: 'Adenolinum lewisii',
        description: 'Stigma capitate (headed); plant produces many branches from the base; styles of same length on different plants.',
        bloom_start: 5,
        bloom_end: 8,
        habitat: 'Dry slopes, forest clearings, roadsides.',
      }];
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockFlower),
      }));
    });

    it('should be called with correct params', async () => {
      const url = `https://bloom-trek-api.herokuapp.com/api/v1/parks/${id}/flowers?month=${month}`;

      await getFlowersByMonth(id, month);

      expect(window.fetch).toHaveBeenCalledWith(url);
    });

    it('should return array if status code ok', async () => {
      const result = await getFlowersByMonth(id, month);

      expect(result).toEqual(mockFlower);
    });

    it('should throw error if status code not ok', async () => {
      const errorMessage = new Error({ message: 'failed' });
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(errorMessage));

      await expect(getFlowersByMonth()).rejects.toEqual(errorMessage);
    });
  });
});
