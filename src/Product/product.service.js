import axios from "axios";


const API_URL = "http://localhost:3000/api/product";

const getProductsCategory = (shopListId) => {
    return axios.get(API_URL + "/category/"+ shopListId);
};
const getProductsAlphabet = (shopListId) => {
    return axios.get(API_URL + "/alphabet/" + shopListId);
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
    return axios.delete(API_URL + "/"+ productId);

}

const updateProductStatus=(productId) =>{
    return axios.put(API_URL + "/status/"+ productId);
}
const updateProduct = ({productId, productName,productAmount,productUnit }) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if(productName === ""){
        productName = "Nazwa"
    }
    let json = JSON.stringify({
        productId: productId,
        productName: productName,
        productAmount: productAmount,
        productUnit: productUnit

    })
    console.log(json);
    return axios.put(API_URL + "/update" , json, customConfig);
};
const handleChange = ( setForm,form ) =>{
    return function(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }
}

const ProductService = {
    getProduct,
    getProductsCategory,
    getProductsAlphabet,
    addProduct,
    deleteProduct,
    updateProductStatus,
    updateProduct,
    handleChange
}
export default ProductService;