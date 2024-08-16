import axios from "axios";


const BASEAPIURL = "http://localhost:8080";


export const getWishlist = async () => {
    try {
        const response = await axios.get(`${BASEAPIURL}/wishlist`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching wishlist.", error);
        throw error;
    }
};

export const addItemToWishlist = async (itemId) => {
    try {
        const response = await axios.post(`${BASEAPIURL}/wishlist`)
        return response.data;
    } catch (error) {
        console.error("There was an error adding item to wishlist.", error);
    }
};

export const removeItemFromWishlist = async (itemId) => {
    try {
        await axios.delete(`${BASEAPIURL}/wishlist`);
    }catch (error) {
        console.error("There was an error removing item from wishlist.", error);
        throw error;
    }
};