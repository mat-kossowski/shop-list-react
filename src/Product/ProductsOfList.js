import Product from './Product';
import './product.css';
import {useContext, useEffect, useState} from "react";
import ProductService from "./product.service";
import ShopListService from "../ShopList/shopList.service";
import {Link, useParams} from "react-router-dom";
import product from "./Product";
import {AuthContext} from "../ProtectedRoutes/auth";
import appService from "../service/app.service";


const ProductsOfList = () => {

    const {shopListId} = useParams();
    const [list, setList] = useState([]);
    const [sortAlphabet, setSortAlphabet] = useState();

    useEffect(() => {

        ShopListService.getStatusSort(shopListId)
            .then(res => setSortAlphabet(res.data));
        ShopListService.getStatusSort(shopListId)
            .then(res => sort(res.data));


    }, []);

    const sort = (x) => {
        if (x === true) {
            ProductService.getProductsAlphabet(shopListId)
                .then(res => setList(res.data))
                .then(r => console.log(r));
        } else {
            ProductService.getProductsCategory(shopListId)
                .then(res => setList(res.data))
                .then(r => console.log(r));
        }
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

    const updateSortStatus = (shopListId) => {
        ShopListService.updateShopListSort(shopListId)
            .then(res => {
                console.log("Sort complete! response:", res);
            })
            .catch((error) => {
                console.log("Sort message error", error);
            });
    }


    const clickSortAlphabet = () => {
        setSortAlphabet(true)
        let newLists = [...list];
        newLists
            .sort(sortByCategory)
        newLists
            .sort(sortByName)

        setList(newLists)

    }

    const clickSortCategory = () => {
        setSortAlphabet(false)
        let newLists = [...list];
        newLists
            .sort(sortByCategory)

        setList(newLists)
    }
    const clickDeleteItem = (productId) => {
        let newLists = [...list];
        newLists = list.filter(product => product.productId !== productId)
        setList(newLists);
    };


    const sortByName = appService.sortByName()
    const sortByCategory = appService.sortByCategory()


    const clickStatusProduct = (productId) => {
        let newLists = [...list];
        newLists
            .filter(product => product.productId === productId)
            .map(product => !product.productStatus ? product.productStatus = true : product.productStatus = false)
        if (sortAlphabet === true) {
            newLists
                .sort(sortByName)
        } else {
            newLists
                .sort(sortByName)
            newLists
                .sort(sortByCategory)
        }

        setList(newLists)

    }

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
            <div className="Messages">
                <div className={"collectionProducts"}>
                    <div>
                        {list
                            .filter(product => product.productStatus === false)
                            .map(product => {
                                return <>
                                    <Product
                                        product={product}
                                        clickStatusProduct={clickStatusProduct}
                                        onDelete={onDelete}
                                        updateProductStatus={updateProductStatus}
                                        clickDeleteItem={clickDeleteItem}
                                        key={product.productId}
                                        // refresh={refresh}
                                    />
                                </>
                            })}
                    </div>

                </div>
            </div>
            <div className="Messages">
                <div>

                    <div className={"collectionProducts"} style={{background: "grey"}}>
                        <div>
                            {list
                                .filter(product => product.productStatus === true)
                                .map(product => {

                                    return <>
                                        <Product
                                            product={product}
                                            clickStatusProduct={clickStatusProduct}
                                            onDelete={onDelete}
                                            updateProductStatus={updateProductStatus}
                                            clickDeleteItem={clickDeleteItem}
                                            key={product.productId}
                                        />
                                    </>
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