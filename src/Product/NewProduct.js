import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ProductService from "./product.service";
import {Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";
import appService from "../service/app.service";
import ShopListService from "../ShopList/shopList.service";
import './product.css'
import bag from "../image/bag.png"
import edit from "../image/edit.png";

function NewProduct() {
    const navigate = useNavigate();
    const options = [
        {value: "NABIAL", label: "NABIAL"},
        {value: "MIESO", label: "MIESO"},
        {value: "WARZYWA", label: "WARZYWA"},
        {value: "CHEMIA", label: "CHEMIA"},
        {value: "INNE", label: "INNE"}
    ];
    const [categoryOptions, setCategory] = useState("");
    const [shopList, setShopList] = useState([]);

    const handleChange2 = (event) => {
        setCategory(event.target.value);
        setForm({...form, [event.target.name]: event.target.value});
    };

    const {shopListId} = useParams();
    useEffect(() => {
        ShopListService.getList(shopListId)
            .then(res => setShopList(res.data))
            .then(r => console.log(r));
    },[])

    const [form, setForm] = useState({
        productName: "",
        productAmount: "0",
        productUnit: "Kg",
        category: "INNE"
    });
    const {productName, productAmount, productUnit, category} = form;

    const handleChange = appService.handleChange(setForm, form)

    function handleSubmit(e) {
        e.preventDefault();
        ProductService.addProduct(shopListId, {
            productName: productName,
            productAmount: productAmount,
            productUnit: productUnit,
            category: category
        })
            .then(res => {
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
        });

        setTimeout(() => {
            navigate(`/shopList/${shopListId}`)
        }, 300)

    }

    return (
        <div className={"WrapperContainer"}>
            <div className={"OuterBox"}>

                <h1>KREATOR LISTY ZAKUPÓW</h1>
            </div>
            <div className={"InnerBox"}>
                <div className={"listName"}>
                    <h2>{shopList.listName}</h2>
                </div>
            </div>
            <div className={"newProductFormBox"}>
                <div className={"newProductForm"}>
                    <form onSubmit={handleSubmit}>

                        <div className={"inputProductName"}>
                            <input
                                maxLength={27}
                                type="text"
                                name="productName"
                                placeholder="Nazwa produktu"
                                value={productName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={"inputProductAmount"}>
                            <input
                                maxLength={5}
                                type="number"
                                name="productAmount"
                                placeholder="0"
                                value={productAmount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={"inputProductUnit"}>

                            <input
                                maxLength={4}
                                type="text"
                                name="productUnit"
                                placeholder="kg"
                                value={productUnit}
                                onChange={handleChange}
                                required
                            />

                        </div>
                        <div className={"inputProductCategory"}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 20 }}>
                            <InputLabel id="demo-simple-select-label">KATEGORIE</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={categoryOptions}
                                onChange={handleChange2}
                                name="category"
                                label="Age"
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}

                            </Select>
                            </FormControl>
                        </div>
                        <div className={"buttonProduct"}>
                            <button type="submit">
                               +
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}

export default NewProduct;




