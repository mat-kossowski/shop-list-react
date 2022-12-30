import Product from './Product';
import './product.css';
import {useEffect, useState} from "react";
import ProductService from "./product.service";
import {Link, useParams} from "react-router-dom";


const ProductsOfList = () => {

    const {shopListId} = useParams();
    const [products, setProducts] = useState([]);
    const [dairy, setDairy] = useState([]);
    const [meat, setMeat] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [chemical, setChemical] = useState([]);
    const [others, setOthers] = useState([]);
    const [category, setCategory] = useState([dairy, others])

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
    }, [shopListId]);

    function matProduct(products) {
        let newLists = [...lists];
        products.forEach(product => {
            console.log(product)
            if (product.category === "NABIAL") {
                newLists[0].product = [...newLists[0].product, product];
                // setDairy(dairy => [...dairy, product])
            } else if (product.category === "MIESO") {
                newLists[1].product = [...newLists[1].product, product];
                // setDairy(dairy => [...dairy, product])
            } else if (product.category === "WARZYWA") {
                newLists[2].product = [...newLists[2].product, product];
                // setDairy(dairy => [...dairy, product])
            } else if (product.category === "CHEMIA") {
                newLists[3].product = [...newLists[3].product, product];
                // setDairy(dairy => [...dairy, product])
            } else if (product.category === "INNE") {
                newLists[4].product = [...newLists[4].product, product];
                // setOthers(others => [...others, product])
            }
        })
        setLists(newLists);
        console.log(lists);
    }


    const handleClick = (index) => {

        console.log(lists);
        let newLists = [...lists];
        newLists[index].show = !newLists[index].show;
        setLists(newLists);


    }


console.log(lists)

    return (
        <>

            <div className="Messages">
                <div>
                    {lists.map((list, index) => (

                        <ol key={index}>
                            <button className={"productList"} onClick={() => handleClick(index)}>{list.name}</button>
                            {list.show && (
                                <ul className={"collectionProducts"} >
                                    {list.product.map((product) => {
                                        return <>
                                            <li><Product productName={product.productName}
                                                         productAmount={product.productAmount}
                                                         category={product.category}
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