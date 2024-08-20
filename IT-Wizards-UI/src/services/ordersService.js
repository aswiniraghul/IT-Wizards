import axios from "axios";


const BASEAPIURL = "http://localhost:8080";


export const getOrders = async (userId) => {
    try {
        const response = await axios.get(`${BASEAPIURL}/orders/${userId}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching orders.", error);
        throw error;
    }
};

export const getOrder = async (userId, orderId) => {
    try {
        const response = await axios.get(`${BASEAPIURL}/orders/${userId}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching orders.", error);
        throw error;
    }
};

export const addOrder = async (userId, orderId) => {
    try {
        const response = await axios.post(`${BASEAPIURL}/orders`, { userId, orderId });
        return response.data;
    } catch (error) {
        console.error("There was an error adding item to wishlist.", error);
    }
};