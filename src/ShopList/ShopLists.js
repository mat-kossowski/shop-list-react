import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";

import ShopListService from "./shopList.service";
import ShopList from "./ShopList";

function ShopLists() {
    const [shopLists, setShopLists] = useState([]);

    useEffect(() => {
        ShopListService.getLists().then(res => setShopLists(res.data)).then(r => console.log(r));
    }, []);

    return (
        <>
            <Link to="/shopList/new">Add new</Link>
            <div className="Messages">
                {shopLists.map((shopList) => {
                    return <Link to={`/shopList/${shopList.shopListId}`}><ShopList listName={shopList.listName}
                    />
                    </Link>
                })}
            </div>
            <Link to="/login">
                Login
            </Link>
            <Link to="/logout">
                Logout
            </Link>
        </>
    );
}

export default ShopLists;
