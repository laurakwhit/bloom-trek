export const getAllParks = async () => {
  const response = await fetch('https://bloom-trek-api.herokuapp.com/api/v1/parks/');
  return await response.json();
}