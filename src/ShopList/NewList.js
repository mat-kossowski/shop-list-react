import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ShopListService from "./shopList.service";
import appService from "../service/app.service";
import checkList from "../image/checkbox.png"


const NewList = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        listName: ""
    });
    const {listName} = form;

    const handleChange = appService.handleChange(setForm, form)

    function handleSubmit(e) {
        e.preventDefault();
        ShopListService.createList({listName: listName})
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

        <>

            <div className={"wrapper-container"}>
                <div className={"pageName"}>
                    <h1 className={"title"}>KREATOR LISTY ZAKUPÓW</h1>
                </div>

                    <div className={"inner-box"}>
                        <div className={"newListFrom"}>
                        <form onSubmit={handleSubmit}>
                            <div className={"inputList"}>
                            <input
                                type="text"
                                name="listName"
                                placeholder="Nazwa Listy"
                                value={listName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                            <div className={"buttonList"}>
                            <button  type="submit">
                                <img className={"iconImage"} src={checkList} alt={'shopping list'}/>
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>

            </div>

        </>
    );
}

export default NewList;
