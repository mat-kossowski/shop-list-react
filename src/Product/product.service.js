import axios from "axios";

const API_URL = "http://localhost:3000/api/product";

const getProducts = (shopListId) => {
    return axios.get(API_URL + "/" + shopListId);
};

const getProduct = (productId, shopListId) => {
    return axios.get(API_URL + +"/"+shopListId+"/" + productId);
};

const addProduct = (shopListId,{productName,productAmount,category }) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let json = JSON.stringify({
        productName: productName,
        productAmount: productAmount,
        category: category

    })
    console.log(json);
    return axios.post(API_URL + "/" + shopListId, json, customConfig);
};

const ProductService = {
    getProduct,
    getProducts,
    addProduct
}
export default ProductService;