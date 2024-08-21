import axios from 'axios';

const BASEAPIURL = 'http://localhost:8080';

export const getUser = async (userName) => {
  try {
    const response = await axios.get(`${BASEAPIURL}/api/users/${userName}`);
      return response.data;
  } catch (error) {
    console.error('There was an error fetching the user.', error);
    throw error;
  }
};
