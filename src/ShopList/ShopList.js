import React, {useState} from "react";
import './shopList.css'
import edit from "../image/edit.png";
import iconDelete from "../image/delete.png";
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
        <div className={"oneShopList"}>
            {editMode ? (

                    <div >
                        <form className={"product"} onSubmit={handleUpdateItem}>
                            <input className={"productDiv"}
                                   type="text"
                                   name="listName"
                                   placeholder="listName"
                                   onChange={handleChangeName}
                                   value={listName}
                                   required
                            />
                            <div className={"MyIconsProduct"}>
                                <button className={"MyIconProduct"} onClick={()=>{
                                    handleUpdateItem()
                                    reload()
                                }}>
                                    Update
                                </button>

                                <button className={"MyIconProduct"} onClick={toggleEditMode}>
                                    Cancel
                                </button>

                            </div>
                        </form>
                    </div>
            ) :
                 (
                     <div>

                         <Link to={`/shopList/${shopList.shopListId}`}>
                             <div className={"shopListName"}>
                                 <h3>{listName}</h3>
                             </div>
                         </Link>
                         <div className={"MyIconsProduct"}>
                             <button className={"MyIconShopList"}
                                 onClick={toggleEditMode}
                             >

                                 <img className={"IconImageShopList"} src={edit} alt={'shopping list'}/>
                             </button>


                             <button className={"MyIconProduct"}
                                     onClick={() => {
                                         onDelete(shopList.shopListId)
                                         clickDeleteItem(shopList.shopListId)
                                     }}
                             >
                                 <img className={"MyIconShopList"} src={iconDelete} alt={'shopping list'}/>
                             </button>
                             <a href={`/shopList/entrusting/${shopList.shopListId}`}

                             >Udostepnij Listę</a>

                         </div>
                     </div>

            )}
        </div>
    );
}

export default ShopList;