import Product from './Product';
import './product.css';
import {useContext, useEffect, useState} from "react";
import ProductService from "./product.service";
import ShopListService from "../ShopList/shopList.service";
import {Link, useParams} from "react-router-dom";
import product from "./Product";
import {AuthContext} from "../ProtectedRoutes/auth";


const ProductsOfList = () => {

    const {shopListId} = useParams();
    const [list, setList] = useState([]);
    const [sortAlph, setSortAlph] = useState();
    // const [lists, setLists] = useState([
    //     {name: "NABIAŁ", product: []},
    //     {name: "MIESO", product: []},
    //     {name: "WARZYWA", product: []},
    //     {name: "CHEMIA", product: []},
    //     {name: "INNE", product: []}
    // ]);
    console.log(sortAlph)
    useEffect(() => {

        ShopListService.getStatusSort(shopListId)
            .then(res => setSortAlph(res.data));
        ShopListService.getStatusSort(shopListId)
            .then(res => sort(res.data));


    }, []);
    console.log(list)
    const sort = (x) => {
        console.log(x)
        if (x === true) {
            console.log("tak")
            ProductService.getProductsAlphabet(shopListId)
                .then(res => setList(res.data))
                .then(r => console.log(r));
        } else {
            console.log("nie");
            console.log(x)
            console.log(x === true)
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
    const clickSortAlph = () => {
        setSortAlph(true)
        let newLists = [...list];
        newLists
            .sort(sortByCategory)
        newLists
            .sort(sortByName)

        setList(newLists)

    }
    const refresh = ()=>{
        setTimeout(()=>{console.log(list)
            console.log("1")
            let newLists = [...list];
            setList(newLists)
            console.log("2")
            console.log(list)
        }, 300)


    }
    const clickSortCategory = () => {
        setSortAlph(false)
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
    const sortByName = (a, b) => {
        const n1 = a.productName.toLowerCase()
        const n2 = b.productName.toLowerCase()
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
    }
    const sortByCategory = (a, b) => {
        const n1 = a.category
        const n2 = b.category
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
    }

    const clickStatusProduct = (productId) => {
        let newLists = [...list];
        newLists
            .filter(product => product.productId === productId)
            .map(product => !product.productStatus ? product.productStatus = true : product.productStatus = false)
        if (sortAlph === true) {
            newLists
                .sort(sortByName)

            console.log("alfabetycznie")
        } else {
            newLists
                .sort(sortByName)
            newLists
                .sort(sortByCategory)
            console.log("categoria")
        }

        setList(newLists)

    }

    return (
        <>
            <div className={"sortProduct"}>
                {sortAlph !== true ? <button className={"buttonSortProduct"} onClick={() => {
                        updateSortStatus(shopListId)
                        clickSortAlph()
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