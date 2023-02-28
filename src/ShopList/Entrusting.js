import {useNavigate, useParams} from "react-router-dom";
import React, { useState} from "react";
import ShopListService from "./shopList.service";



const Entrusting = () =>{
    const navigate = useNavigate();

    const {shopListId} = useParams();
    const initial = {
        userName: ""

    };

    const [form, setForm] = useState(initial);
    const {userName}  = form;


    function handleChange(e) {


        const {name, value} = e.target;
        console.log(name)
        console.log(value)
        if (value === "") {
            setForm(() => {
                return {
                    ...form, [name]: ""
                };
            });
        } else {
            setForm(() => {
                return {
                    ...form, [name]: value
                };
            });
        }

    }
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
                {/*<h3>{list.listName}</h3>*/}
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