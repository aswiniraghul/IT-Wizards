import axios from 'axios';

const BASEAPIURL = 'http://localhost:8080';

export const getImages = async (id) => {
  try {
      const response = await axios.get(`${BASEAPIURL}/images/imageList`); {
          console.log(response);
      }
    //   console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the images.', error);
    throw error;
  }
};