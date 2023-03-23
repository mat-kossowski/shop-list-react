import Product from './Product';
import './productsOfList.css';
import React, {useEffect, useState} from "react";
import ProductService from "./product.service";
import ShopListService from "../ShopList/shopList.service";
import {Link, useParams} from "react-router-dom";

import appService from "../service/app.service";
import product from "./Product";


const ProductsOfList = () => {

    const {shopListId} = useParams();
    const [list, setList] = useState([]);
    const [sortAlphabet, setSortAlphabet] = useState();
    const [shopList, setShopList] = useState([]);
    useEffect(() => {
        ShopListService.getStatusSort(shopListId)
            .then(res => setSortAlphabet(res.data))
            .then(r => console.log(r));
        ShopListService.getStatusSort(shopListId)
            .then(res => sort(res.data))
            .then(r => console.log(r));
        ShopListService.getList(shopListId)
            .then(res => setShopList(res.data))
            .then(r => console.log(r));
    }, []);

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

    const updateSortStatus = (shopListId) => {
        ShopListService.updateShopListSort(shopListId)
            .then(res => {
                console.log("Sort complete! response:", res);
            })
            .catch((error) => {
                console.log("Sort message error", error);
            });
    }

    const sort = appService.sort(shopListId, setList)
    const clickSortAlphabet = appService.clickSortAlphabet(setSortAlphabet, setList, list)
    const clickSortCategory = appService.clickSortCategory(setSortAlphabet, setList, list)
    const clickStatusProduct = appService.clickStatusProduct(setList, sortAlphabet, list)
    const clickDeleteItem = appService.clickDeleteItem(setList, list)
    console.log(list.length)

    return (
        <div className={"productOdListContainer"}>
            <div className={"OuterBox"}>
                <h1>{shopList.listName}</h1>
            </div>
            <div>
                {list.length === 0
                    ?
                    <div className={"emptyList"}>

                        <p>Wrzuć coś do Listy</p>

                    </div>
                    :
                    <>
                        <div className={"sortProductBox"}>
                            <div className={"sortProduct"}>
                                {sortAlphabet !== true
                                    ?
                                    <>
                                        <button className={"buttonSortProduct"} style={{background: "grey"}}
                                                onClick={() => {
                                                    updateSortStatus(shopListId)
                                                    clickSortAlphabet()
                                                }}>
                                            Alfabetycznie
                                        </button>
                                        <button className={"buttonSortProduct"} onClick={() => {
                                            updateSortStatus(shopListId)
                                            clickSortCategory()
                                        }}>
                                            Kategoriami
                                        </button>

                                    </>
                                    :
                                    <>
                                        <button className={"buttonSortProduct"} onClick={() => {
                                            updateSortStatus(shopListId)
                                            clickSortAlphabet()
                                        }}>
                                            Alfabetycznie
                                        </button>

                                        <button className={"buttonSortProduct"} style={{background: "grey"}}
                                                onClick={() => {
                                                    updateSortStatus(shopListId)
                                                    clickSortCategory()
                                                }}>
                                            Kategoriami
                                        </button>
                                    </>
                                }
                            </div>

                        </div>
                        <div className="productOfListContainer">
                            <div className={"collectionProducts"}>
                                {list
                                    .filter(product => product.productStatus === false)
                                    .map(product => {
                                        return <Product
                                            product={product}
                                            clickStatusProduct={clickStatusProduct}
                                            onDelete={onDelete}
                                            updateProductStatus={updateProductStatus}
                                            clickDeleteItem={clickDeleteItem}
                                            key={product.productId}
                                        />
                                    })}
                            </div>
                        </div>
                        <div className="productOfListContainer">
                            <div className={"collectionProducts"}>
                                {list
                                    .filter(product => product.productStatus === true)
                                    .map(product => {
                                        return <Product
                                            style={{background: "grey"}}
                                            product={product}
                                            clickStatusProduct={clickStatusProduct}
                                            onDelete={onDelete}
                                            updateProductStatus={updateProductStatus}
                                            clickDeleteItem={clickDeleteItem}
                                            key={product.productId}
                                        />
                                    })}
                            </div>
                        </div>

                    </>
                }
            </div>


            <Link to={`/product/new/${shopListId}`}>
                <button className={"addNewProduct"}>+</button>

            </Link>

        </div>

    );
}

export default ProductsOfList;