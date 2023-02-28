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
    let json = JSON.stringify({listName: listName})
    return axios.post(API_URL, json, customConfig);
};
const getStatusSort = (shopListId) => {
    return axios.get("http://localhost:3000/api/shoplist/sort/" + shopListId)
}

const deleteShopList = (shopListId) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios.delete(API_URL + "/" + shopListId);

}
const updateShopListName = ({shopListId, listName}) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (listName === "") {
        listName = "Nowa Lista"
    }
    let json = JSON.stringify({
        shopListId: shopListId,
        listName: listName
    })
    console.log(json);
    return axios.put(API_URL + "/update", json, customConfig);
};
const entrustingShopList = (shopListId, {userName}) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let json = JSON.stringify({
        userName: userName
    })

    return axios.post(API_URL + "/entrusting/" + shopListId, json, customConfig);
};


const updateShopListSort = (shopListId) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios.put(API_URL + "/sort/" + shopListId);
}

const ShopListService = {
    getLists,
    getList,
    createList,
    updateShopListSort,
    deleteShopList,
    updateShopListName,
    entrustingShopList,
    getStatusSort
}
export default ShopListService;