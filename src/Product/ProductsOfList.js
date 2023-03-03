import Product from './Product';
import './product.css';
import {useEffect, useState} from "react";
import ProductService from "./product.service";
import ShopListService from "../ShopList/shopList.service";
import {Link, useParams} from "react-router-dom";

import appService from "../service/app.service";


const ProductsOfList = () => {

    const {shopListId} = useParams();
    const [list, setList] = useState([]);
    const [sortAlphabet, setSortAlphabet] = useState();

    useEffect(() => {
        ShopListService.getStatusSort(shopListId)
            .then(res => setSortAlphabet(res.data))
            .then(r => console.log(r));
        ShopListService.getStatusSort(shopListId)
            .then(res => sort(res.data))
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


    return (
        <>
            <div className={"sortProduct"}>
                {sortAlphabet !== true ? <button className={"buttonSortProduct"} onClick={() => {
                        updateSortStatus(shopListId)
                        clickSortAlphabet()
                    }}>
                        alfabetycznie</button>
                    :
                    <button className={"buttonSortProduct"} onClick={() => {
                        updateSortStatus(shopListId)
                        clickSortCategory()
                    }}>
                        categoriami</button>
                }


            </div>
            <div className="productOfListContainer">
                <div className={"collectionProducts"}>
                    <div>
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
            </div>
            <div className="productOfListContainer">
                <div>

                    <div className={"collectionProducts"} style={{background: "grey"}}>
                        <div>
                            {list
                                .filter(product => product.productStatus === true)
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
                </div>

            </div>

            <Link to={`/product/new/${shopListId}`}>Add new</Link>

        </>

    )
        ;
}

export default ProductsOfList;