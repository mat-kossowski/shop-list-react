import React, {useState} from "react";
import './shopList.css'
import edit from "../image/edit.png";
import iconDelete from "../image/delete.png";
import iconShare from "../image/share.png"
import iconCheck from "../image/checkbox.png"
import iconRemove from "../image/remove.png"
import {Link} from "react-router-dom";
import ShopListService from "./shopList.service";
import appService from "../service/app.service";

function ShopList({shopList, onDelete, clickDeleteItem}) {

    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const initial = {
        listName: shopList.listName

    };
    const [form, setForm] = useState(initial);
    const {listName} = form;

    const handleUpdateItem = () => {
        ShopListService.updateShopListName({
            shopListId: shopList.shopListId,
            listName: listName
        })
            .then(res => {
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
        });
        toggleEditMode();
    }
    const reload = appService.reload(setForm, form)
    const handleChangeName = appService.handleChangeName(setForm, form)


    return (
        <>
            <div className={"containerOneShopList"}>
                {editMode ? (

                        <div className={"oneShopList"}>
                            <form className={"formList"} onSubmit={handleUpdateItem}>
                                <div className={"shopListName"}>


                                    <input
                                           type="text"
                                           name="listName"
                                           placeholder="listName"
                                           onChange={handleChangeName}
                                           value={listName}
                                           required
                                    />
                                </div>
                                <div className={"myIconsProduct"} style={{width:"20%",marginLeft:"15px"}}>
                                    <div className={"myIcon"} onClick={() => {
                                        handleUpdateItem()
                                        reload()
                                    }}>
                                        <img className={"iconImage"} src={iconCheck} alt={'shopping list'}/>
                                    </div>

                                    <div className={"myIcon"} onClick={toggleEditMode}>
                                        <img className={"iconImage"} src={iconRemove} alt={'shopping list'}/>
                                    </div>
                                </div>
                            </form>
                        </div>

                    ) :
                    (
                        <div className={"oneShopList"}>


                            <div className={"shopListName"}>
                                <Link to={`/shopList/${shopList.shopListId}`}>
                                    <h3>{listName}</h3>

                                </Link>
                            </div>
                            <div className={"myIconsProduct"}>
                                <div className={"myIcon"} onClick={toggleEditMode}>
                                    <img className={"iconImage"} src={edit} alt={'shopping list'}/>
                                </div>
                                <div className={"myIcon"}>
                                    <Link to={`/shopList/entrusting/${shopList.shopListId}`}>
                                        <img className={"iconImage"} src={iconShare} alt={'shopping list'}/>
                                    </Link>
                                </div>


                                <div className={"myIcon"}
                                     onClick={() => {
                                         onDelete(shopList.shopListId)
                                         clickDeleteItem(shopList.shopListId)
                                     }}>
                                    <img className={"iconImage"} src={iconDelete} alt={'shopping list'}/>
                                </div>


                            </div>
                        </div>


                    )}
            </div>
        </>
    );
}

export default ShopList;