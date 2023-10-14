import axios from "axios";

class api {
    _url: string;
    _cache: any;

    constructor() {
        this._url = "https://63f33e6dfe3b595e2eddd3d1.mockapi.io/bunkid/";
        this._cache = {};
    }

    async getProducts() {
        try {
            const response = await axios.get(`${this._url}/user`);
            const products = response.data;
            return products;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching products");
        }
    }
}

export default new api();
