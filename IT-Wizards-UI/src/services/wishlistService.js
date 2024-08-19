import axios from "axios";


const BASEAPIURL = "http://localhost:8080";


export const getWishlist = async (userId) => {
    try {
        const response = await axios.get(`${BASEAPIURL}/wishlist/${userId}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching wishlist.", error);
        throw error;
    }
};

export const addItemToWishlist = async (userId, itemId) => {
    try {
        const response = await axios.post(`${BASEAPIURL}/wishlist`, { userId, itemId });
        return response.data;
    } catch (error) {
        console.error("There was an error adding item to wishlist.", error);
    }
};

export const removeItemFromWishlist = async (userId, itemId) => {
    try {
        await axios.delete(`${BASEAPIURL}/wishlist/${userId}/${itemId}`);
    }catch (error) {
        console.error("There was an error removing item from wishlist.", error);
        throw error;
    }
};