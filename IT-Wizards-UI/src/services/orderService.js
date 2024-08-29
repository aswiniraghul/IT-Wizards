import axios from "axios";


const BASEAPIURL = "http://localhost:8080/orders";

export const createOrder = async (userId, addressId) => {
    try {
        const response = await axios.post(`${BASEAPIURL}/${userId}`, {addressId});
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                console.error("User, Address, or Cart not found.");
            } else if (error.response.status === 400) {
                console.error("Bad Request: Cart item not found.");
            } else {
                console.error("Error creating order:", error.message);
            }
        } else {
            console.error("Error creating order:", error.message);
        }
        throw error;
    }
};

export const getUserOrders = async (userId) => {
    try {
        const response = await axios.get(`${BASEAPIURL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching user orders.", error);
        throw error;
    }
};

export const getOrderForUser = async (userId, orderId) => {
    try {
        const response = await axios.get(`${BASEAPIURL}/${userId}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the order.", error);
        throw error;
    }
};
