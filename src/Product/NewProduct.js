import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import ProductService from "./product.service";
import { Select, MenuItem } from "@material-ui/core";


function NewProduct(){
    const navigate = useNavigate();
    const options = [
        { value: "NABIAL", label: "NABIAL" },
        { value: "MIESO", label: "MIESO" },
        { value: "WARZYWA", label: "WARZYWA" },
        { value: "CHEMIA", label: "CHEMIA" },
        { value: "INNE", label: "INNE" }
    ];
    const [gender, setGender] = useState("");

    const handleChange2 = (event) => {
        setGender(event.target.value);
        setForm({...form, [event.target.name]: event.target.value});
    };

    const {shopListId} = useParams();

    const [form, setForm] = useState({
        productName: "",
        productAmount: "",
        category: ""
    });
    const {productName, productAmount,category} = form;

    function handleChange(e) {

        setForm({...form, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        ProductService.addProduct(shopListId,{
            productName:productName,
            productAmount:productAmount,
            category:category
        })
            .then(res=>{
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
        });
        setTimeout(()=>{
            navigate(`/shopList/${shopListId}`)
        }, 300)

    }
    return (
        <div className={"wrapper-container"}>
            <div className={"outer-box"}>
                <div className={"inner-box"}>
                    <h1 className={"title"}>Add new message</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="productName"
                            placeholder="productName"
                            value={productName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="productAmount"
                            placeholder="productAmount"
                            value={productAmount}
                            onChange={handleChange}
                            required
                        />
                        <Select
                            value={gender}
                            onChange={handleChange2}
                            name="category"
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}

                        </Select>
                        <button className={"submit-btn"} type="submit">
                            Add
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );

}
export default NewProduct;




