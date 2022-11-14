import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import React, {useEffect, useState} from "react";
import Products from "./Products";
import NewProduct from "./NewProduct";
import ButtonAdd from "./ButtonAdd";


const App = () => {
    const [products, setProducts] = useState([])
    const [showAddProduct, setShowAddProduct] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            const tasksFromServer = await fetchProducts()
            setProducts(tasksFromServer)
        }
        getProducts()

    }, [])

    // Fetch Tasks
    const fetchProducts = async () => {
        const res = await fetch('http://localhost:8080/products')
        const data = await res.json()
        return data
    }
    // Fetch Product
    const fetchProduct = async (id) => {
        const res = await fetch(`http://localhost:8080/product/${id}`)
        const data = await res.json()

        return data
    }
// Sort
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
    // Add Task
    const addProduct = async (product) => {
        const res = await fetch('http://localhost:8080/product/new', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            },

            body: JSON.stringify(product),
        })
        const data = await res.json()
        setProducts([...products, data].sort(sortByStatusAndName))
    }
    // Delete Task
    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:8080/products/${id}`, {
            method: 'DELETE',
        })
        // We should control the response status to decide if we will change the state or not.
        res.status === 200
            ? setProducts(products.filter((product) => product.productId !== id))
            : alert('Error Deleting This Task')
    }
    // Toggle Reminder

    const toggleStatus = async (id) => {
        const productToToggle = await fetchProduct(id)
        const updProduct = {...productToToggle, productStatus: !productToToggle.productStatus}
        const res = await fetch(`http://localhost:8080/product/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(updProduct),
        })

        return res.json();
    }
    const updateStatus = (id) => {
        toggleStatus(id)
            .then(data => {
                setProducts(
                    products
                        .map((product) =>
                            product.productId === id ? {...product, productStatus: data.productStatus} : product)
                        .sort(sortByStatusAndName)
                )
            })

    }
    return (
        <div className="App">
            <h1>Lista zakupów</h1>
            <Router>
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <Products products={products} onDelete={deleteProduct} onToggle={updateStatus}/>
                            {showAddProduct && <NewProduct onAdd={addProduct}/>}
                            <ButtonAdd onAdd={() => setShowAddProduct(!showAddProduct)}
                                       showAdd={showAddProduct}/>
                        </>

                    }

                    >
                    </Route>


                </Routes>

            </Router>
        </div>
    );
}

export default App;
