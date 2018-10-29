export const getAllParks = async () => {
  try {
    const response = await fetch(
      'https://bloom-trek-api.herokuapp.com/api/v1/parks/',
    );
    return response.json();
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

export const getParkTrails = async (id) => {
  try {
    const response = await fetch(
      `https://bloom-trek-api.herokuapp.com/api/v1/parks/${id}/trails`,
    );
    return response.json();
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

export const getFlowersByMonth = async (id, month) => {
  try {
    const response = await fetch(
      `https://bloom-trek-api.herokuapp.com/api/v1/parks/${id}/flowers?month=${month}`,
    );
    return response.json();
  } catch (error) {
    throw new Error({ message: error.message });
  }
};