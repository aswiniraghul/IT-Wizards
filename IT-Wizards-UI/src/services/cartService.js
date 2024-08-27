import axios from "axios";

const BASEAPIURL = "http://localhost:8080/cart";

export const addItemToCart = async (userId, newItemId) => {
  try {
    const response = await axios.post(`${BASEAPIURL}`, {
      userId: userId,
      newItemId: newItemId
    });
    return response.data;
  } catch (error) {
    console.error("There was an error adding the item to the cart.", error);
    throw error;
  }
};

export const getCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASEAPIURL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the cart.", error);
    throw error;
  }
};

export const getAllCartItems = async (userId) => {
  try {
    const response = await axios.get(`${BASEAPIURL}/${userId}/items`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the cart items.", error);
    throw error;
  }
};

export const removeOneItemFromCart = async (userId, cartItemId) => {
  try {
    await axios.put(`${BASEAPIURL}/${userId}/removeOneItem/${cartItemId}`,);
  } catch (error) {
    console.error("There was an error updating the cart item quantity.", error);
    throw error;
  }
};

export const deleteCartItem = async (userId, cartItemId) => {
  try {
    await axios.delete(`${BASEAPIURL}/${userId}/removeItem/${cartItemId}`);
  } catch (error) {
    console.error("There was an error deleting the cart item.", error);
    throw error;
  }
};
