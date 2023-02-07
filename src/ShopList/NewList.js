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
        e.preventDefault();
        console.log("tu")
        ShopListService.createList({listName: listName})
            .then(res => {
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
            setErrors("creation error");
        });
        setErrors("created successfully");
        setTimeout(()=>{
        navigate('/shopLists')
        }, 300)
    }


// Add List
//     const submitForm = (e) => {
//         e.preventDefault()
//
//         if (!listName) {
//             alert('Please add a list')
//             return
//         }
//         fetch(`http://localhost:8080/api/shoplist/newlist`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//
//             },
//             body: JSON.stringify({
//                 "listName": listName,
//             }),
//         })
//             .then(response => response.json())
//             .then(response => console.log(JSON.stringify(response)))
//         history('/home')
//
//     }

    return (

        <>
            <span className="navbar-text">
                        <Link className="nav-link float-start" to={'/'}>
                            <button className="btn btn-secondary btn-sm mx-2 my-1">BACK</button></Link>

                    </span>
            <div className={"wrapper-container"}>
                <div className={"outer-box"}>
                    <div className={"inner-box"}>
                        <h1 className={"title"}>Add new message</h1>
                        <h4>{errors}</h4>
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
