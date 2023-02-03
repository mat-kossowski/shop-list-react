import axios from "axios";
import product from "./Product";

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


const deleteProduct = (productId) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios.delete(API_URL + "/"+ productId);

}

const updateProductStatus=(productId) =>{
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios.put(API_URL + "/status/"+ productId);
}

const ProductService = {
    getProduct,
    getProducts,
    addProduct,
    deleteProduct,
    updateProductStatus
}
export default ProductService;