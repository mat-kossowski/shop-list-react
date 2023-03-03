import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Start from "./Start/Start";
import NewList from "./ShopList/NewList";
import Logout from "./Logout/Logout";
import ShopLists from "./ShopList/ShopLists";
import ProductsOfList from "./Product/ProductsOfList";
import NewProduct from "./Product/NewProduct";
import PageLogin from "./PageLogin/PageLogin";
import Navbar from "./Navbar/Navbar";
import React from "react";
import AuthProvider from "./ProtectedRoutes/auth";
import Entrusting from "./ShopList/Entrusting";


const App = () => {
    return (

        <AuthProvider>
            <div className="App">
                <Navbar/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Start/>}/>
                        <Route path="/login" element={<PageLogin/>}/>
                        <Route path="/shopLists" element={<ShopLists/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/shopList/new" element={<NewList/>}/>
                        <Route path="/product/new/:shopListId" element={<NewProduct/>}/>
                        <Route path="/shopList/entrusting/:shopListId" element={<Entrusting/>}/>
                        <Route exact path='/shopList/:shopListId' element={<ProductsOfList/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
