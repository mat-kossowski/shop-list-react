import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ShopListService from "./shopList.service";
import appService from "../service/app.service";


const Entrusting = () =>{

    const navigate = useNavigate();
    const {shopListId} = useParams();
    const [shopList, setShopList] = useState([]);

    const initial = {
        userName: ""

    };

    const [form, setForm] = useState(initial);
    const {userName}  = form;
    const handleChange = appService.handleChangeName(setForm, form)

    useEffect(()=>{
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


return(
        <div>

            <div>
                <h3>{shopList.listName}</h3>
            </div>
            <div>
                <div >
                    <form onSubmit={handleEntrusting}>
                        <input
                               type="text"
                               name="userName"
                               placeholder="userName"
                               onChange={handleChange}
                               value={userName}
                               required
                        />
                        <div>
                            <button type={"submit"}>
                                Update
                            </button>



                        </div>
                    </form>
                </div>
            </div>
        </div>

    );


}

export default Entrusting;