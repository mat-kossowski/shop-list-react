import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import './shopList.css'
import ShopListService from "./shopList.service";
import ShopList from "./ShopList";


function ShopLists() {
    const [shopLists, setShopLists] = useState([]);


    useEffect(() => {
        ShopListService.getLists()
            .then(res => console.log(res.data))
            .then(r => console.log(r));
        ShopListService.getLists()
            .then(res => setShopLists(res.data))
            .then(r => console.log(r));
    }, []);

    const onDelete = shopListId => {
        ShopListService.deleteShopList(shopListId)
            .then(res => {
                console.log("Request complete! response:", res);
            })
            .catch((error) => {
                console.log("creating message error", error);
            });
    }
    const clickDeleteItem = (shopListId) => {
        setShopLists(shopLists.filter(shopList => shopList.shopListId !== shopListId));
    };

    return (
        <>
            <div className={"containerOfShopLists"}>
                <div className={"titleList"}>
                    <h1>MOJE LISTY</h1>
                </div>
                <div>
                    <Link to="/shopList/new">
                        <button>+ NOWA LISTA</button>
                    </Link>
                </div>
                <div className="boxOfShopLists">
                    {shopLists.map(function (shopList) {
                        return <React.Fragment key={shopList.shopListId}>


                                <ShopList

                                    shopList={shopList}
                                    onDelete={onDelete}
                                    clickDeleteItem={clickDeleteItem}
                                />


                        </React.Fragment>
                    })}
                </div>


            </div>
        </>
    );
}

export default ShopLists;
