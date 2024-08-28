import axios from "axios";


const BASEAPIURL = "http://localhost:8080";

export const getOrders = async (userId) => {
        try {
        const response = await axios.get(`${BASEAPIURL}/orders`); {
            params: {userId}
        };
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the orders.", error);
        throw error;
    }
};
