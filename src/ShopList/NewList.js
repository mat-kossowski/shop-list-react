import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ShopListService from "./shopList.service";
import appService from "../service/app.service";


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
                <div className={"outer-box"}>
                    <div className={"inner-box"}>
                        <h1 className={"title"}>Stwórz nowa listę</h1>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="listName"
                                placeholder="listName"
                                value={listName}
                                onChange={handleChange}
                                required
                            />

                            <button className={"submit-btn"} type="submit">
                                Add
                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default NewList;
