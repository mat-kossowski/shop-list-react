import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ShopListService from "./shopList.service";
import appService from "../service/app.service";
import './shopList.css'
import iconSend from "../image/upload.png"
import iconRemove from "../image/remove.png";
const Entrusting = () => {

    const navigate = useNavigate();
    const {shopListId} = useParams();
    const [shopList, setShopList] = useState([]);

    const initial = {
        userName: ""

    };

    const [form, setForm] = useState(initial);
    const {userName} = form;
    const handleChange = appService.handleChangeName(setForm, form)

    useEffect(() => {
        ShopListService.getList(shopListId)
            .then(res => setShopList(res.data))
            .then(r => console.log(r));
    })

    const handleEntrusting = (e) => {
        e.preventDefault();
        ShopListService.entrustingShopList(shopListId, {
            userName: userName
        })
            .then(res => {
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
        });

        setTimeout(() => {
            navigate('/shopLists')
        }, 100)
    }


    return (
        <div className={"entrusting"}>

            <div className={"pageName"}>
                <h1>PODZIEL SIĘ</h1>
            </div>
            <div className={"entrustingBox"}>
                <div className={"listName"}>
                    <h2>{shopList.listName}</h2>
                </div>

                <div className={"entrustingForm"}>
                    <form onSubmit={handleEntrusting}>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Nazwa Użytkownika"
                            onChange={handleChange}
                            value={userName}
                            required
                        />
                        <div>
                            <button type={"submit"}>
                                <img className={"iconImage"} src={iconSend} alt={'shopping list'}/>
                            </button>


                        </div>
                    </form>
                </div>
                <div>
            </div>
        </div>
</div>

)
    ;


}

export default Entrusting;