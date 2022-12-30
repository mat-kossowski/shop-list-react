import Product from './Product';
import './product.css';
import {useEffect, useState} from "react";
import ProductService from "./product.service";
import {Link, useParams} from "react-router-dom";

const ProductsOfList = () => {

    const {shopListId} = useParams();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log(shopListId)
        ProductService.getProducts(shopListId).then(res => setProducts(res.data)).then(r => console.log(r));

    },[shopListId]);

    return (
        <>
        <Link to={`/product/new/${shopListId}`}>Add new</Link>
    <div className="Messages">
        {products.map((product) => {
            return <Product productName={product.productName}
                            productAmount={product.productAmount}
                            category={product.category}
            />
        })}
    </div>
    <Link to="/login">
        Login
    </Link>
    <Link to="/logout">
        Logout
    </Link>
</>

)
    ;
}

export default ProductsOfList;