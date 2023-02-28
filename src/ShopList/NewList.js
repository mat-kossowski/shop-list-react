import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ShopListService from "./shopList.service";


const NewList = () => {
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const [form, setForm] = useState({
        listName: ""
    });
    const {listName} = form;

    function handleChange(e) {
        console.log("to")

        setForm({...form, [e.target.name]: e.target.value});
    }


    function handleSubmit(e) {
        // e.preventDefault();
        console.log("tu")
        ShopListService.createList({listName: listName})
            .then(res => {
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
            setErrors("creation error");
        });
        setErrors("created successfully");
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
