import Product from './Product';
import './product.css';
import {useEffect, useState} from "react";
import ProductService from "./product.service";
import {Link, useParams} from "react-router-dom";



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
            .then(res => addProductsToLists(res.data))
            .then(r => console.log(r));
    }, []);

    function addProductsToLists(products) {
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
    const sortByStatusAndName = (a, b) => {
        const s1 = a.productStatus
        const s2 = b.productStatus
        const n1 = a.productName
        const n2 = b.productName
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
    }

    const clickStatusProduct = (index, productId) => {
        let newLists = [...lists];
        newLists[index].product
            .filter(product => product.productId === productId)
            .map(product => !product.productStatus ? product.productStatus = true : product.productStatus = false)
        newLists[index].product
            .sort(sortByStatusAndName)
        setLists(newLists)

    }

    return (
        <>

            <div className="Messages">
                <div>
                    {lists.map((list, index) => (

                        <div className={"category"} key={index}>
                            <div className={"headCategory"}>
                                <button className={"productList"}
                                        onClick={() => handleClick(index)}>{list.name}</button>
                            </div>
                            {list.show && (
                                <div className={"collectionProducts"}>
                                    <ul>
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
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            <Link to={`/product/new/${shopListId}`}>Add new</Link>

        </>

    )
        ;
}

export default ProductsOfList;