import axios from "axios";

const API_URL = "http://localhost:3000/api/shoplist";

const getLists = () => {
    return axios.get(API_URL);
};

const getList = (shopListId) => {
    return axios.get(API_URL + "/" + shopListId);
};

const createList = ({listName: listName}) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let json = JSON.stringify({listName: listName })
    return axios.post(API_URL, json, customConfig);
};

const ShopListService = {
    getLists,
    getList,
    createList
}
export default ShopListService;