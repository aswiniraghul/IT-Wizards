import axios from "axios";


const BASEAPIURL = "http://localhost:8080";

export const getItems = async () => {
    try {
        const response = await axios.get(`${BASEAPIURL}/items`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the items.", error);
        throw error;
    }
};
