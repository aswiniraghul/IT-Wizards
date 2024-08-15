import axios from "axios";


const BASEAPIURL = "http://localhost:8080";

export const getOrders = async () => {
        const response = await axios.get(`${BASEAPIURL}/orders`);
        return response.data;
    };
