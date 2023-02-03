import Product from './Product';
import './product.css';
import {useEffect, useReducer, useRef, useState} from "react";
import ProductService from "./product.service";
import {Link, useParams} from "react-router-dom";
import product from "./Product";


const ProductsOfList = () => {

    const {shopListId} = useParams();

    const [lists, setLists] = useState([
        {name: "NABIAŁ", show: false, product: []},
        {name: "MIESO", show: false, product: []},
        {name: "WARZYWA", show: false, product: []},
        {name: "CHEMIA", show: false, product: []},
        {name: "INNE", show: false, product: []}
    ]);

    useEffect(() => {
        ProductService.getProducts(shopListId)
            .then(res => matProduct(res.data))
            .then(r => console.log(r));
    }, []);

    function matProduct(products) {
        let newLists = [...lists];
        products.forEach(product => {
            if (product.category === "NABIAL") {
                newLists[0].product = [...newLists[0].product, product];
            } else if (product.category === "MIESO") {
                newLists[1].product = [...newLists[1].product, product];
            } else if (product.category === "WARZYWA") {
                newLists[2].product = [...newLists[2].product, product];
            } else if (product.category === "CHEMIA") {
                newLists[3].product = [...newLists[3].product, product];
            } else if (product.category === "INNE") {
                newLists[4].product = [...newLists[4].product, product];
            }
        })
        setLists(newLists);
    }

    const handleClick = (index) => {
        let newLists = [...lists];
        newLists[index].show = !newLists[index].show;
        setLists(newLists);
    }
    const onDelete = productId => {
        ProductService.deleteProduct(productId)
            .then(res => {
                console.log("Request complete! response:", res);
            })
            .catch((error) => {
                console.log("creating message error", error);
            });
    }
    const updateProductStatus = productId => {
        ProductService.updateProductStatus(productId)
            .then(res => {
                console.log("Request complete! response:", res);
            })
            .catch((error) => {
                console.log("creating message error", error);
            });
    }

    const clickDeleteItem = (index, productId) => {
        let newLists = [...lists];
        newLists[index].product = lists[index].product.filter(product => product.productId !== productId)
        setLists(newLists);
    };

    const clickStatusProduct = (index, productId) => {
        let newLists = [...lists];
        newLists[index].product
            .filter(product => product.productId === productId)
            .map(product => !product.productStatus ? product.productStatus=true : product.productStatus=false)
        newLists[index].product
            .sort((a,b) =>{
                if (a.productName < b.productName) return -1;
                if (a.productName> b.productName) return 1;
                return 0;
            })
        newLists[index].product.sort((a,b) =>a.productStatus - b.productStatus)

        setLists(newLists)

    }

    return (
        <>

            <div className="Messages">
                <div>
                    {lists.map((list, index) => (

                        <ol key={index}>
                            <button className={"productList"} onClick={() => handleClick(index)}>{list.name}</button>
                            {list.show && (
                                <ul className={"collectionProducts"}>
                                    {list.product
                                        .map(product => {

                                        return <>
                                            <li><Product
                                                index={index}
                                                product={product}
                                                clickStatusProduct={clickStatusProduct}
                                                onDelete={onDelete}
                                                updateProductStatus={updateProductStatus}
                                                clickDeleteItem={clickDeleteItem}
                                                key={product.productId}
                                            />
                                            </li>
                                        </>
                                    })}
                                </ul>
                            )}
                        </ol>
                    ))}
                </div>

            </div>

            <Link to={`/product/new/${shopListId}`}>Add new</Link>

        </>

    )
        ;
}

export default ProductsOfList;