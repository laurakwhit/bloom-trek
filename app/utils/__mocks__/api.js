export const getAllParks = () => (
  [{
      "id": 1,
      "name": "Castlewood Canyon",
      "coords": {
        "latitude": 39.3379,
        "longitude": -104.7512
      }
    },
    {
      "id": 2,
      "name": "Deer Creek Canyon",
      "coords": {
        "latitude": 39.542,
        "longitude": -105.1491
      }
    }]
);

export const getParkTrails = () => (
  [{
      "id": 10,
      "name": "Blue Loop and Challenge Hill",
      "uid": 7010867,
      "difficulty": "hard",
      "length": 0.6,
      "status": "All Clear",
      "trail_img_url": "https://cdn-files.apstatic.com/hike/7007993_medium_1446301088.jpg",
      "trail_url": "https://www.hikingproject.com/trail/7010867/blue-loop-and-challenge-hill",
      "summary": "Challenge Hill is a 200-step climb up the face of the mountain.",
      "latitude": 39.3678,
      "longitude": -104.8787,
      "park_id": 1
    }]
);

export const getFlowersByMonth = () => (
  [{
      "id": 1,
      "common_name": "blue flax",
      "scientific_name": "Adenolinum lewisii",
      "flower_img_url": "http://extension.colostate.edu/county/jeffco/natural/plant_images/adenolinum_lewisii_1_378x400.jpg",
      "description": "stigma capitate (headed); plant produces many branches from the base; styles of same length on different plants.",
      "bloom_start": 5,
      "bloom_end": 8,
      "name": "WILD BLUE FLAX",
      "habitat": "dry slopes, forest clearings, roadsides."
    },
    {
      "id": 4,
      "common_name": "purple milk vetch",
      "scientific_name": "Astragalus agrestis",
      "flower_img_url": "http://extension.colostate.edu/county/jeffco/natural/plant_images/astragalus_agrestis_400x327.jpg",
      "description": "blunt keel; flowers erect, clustered in ovoid heads; pubescence basifixed (hairs attached at the base).",
      "bloom_start": 3,
      "bloom_end": 5,
      "name": "FIELD MILKVETCH",
      "habitat": "grasslands on the plains and mesas."
    }]
);
