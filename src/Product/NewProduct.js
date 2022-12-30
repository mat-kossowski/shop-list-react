import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import ProductService from "./product.service";
import { Select, MenuItem } from "@material-ui/core";
// import {MenuItem} from "@mui/material";


function NewProduct(){

    const options = [
        { value: "NABIAL", label: "NABIAL" },
        { value: "MIESO", label: "MIESO" },
        { value: "other", label: "Other" }
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
                        <Link to="/">
                            Back to main page
                        </Link>
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/logout">
                            Logout
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default NewProduct;








// import React, {useState} from 'react';
//
// const NewProduct = ({onAdd})=> {
//     const [productName, setName] = useState('')
//     const [productAmount, setAmount] = useState('')
//     const [shopListId, setShopListId] = useState(1)
//
// const onSubmit = (e) => {
//     e.preventDefault()
//
//     if (!productName) {
//       alert('Please add a task')
//       return
//     }
//
//     onAdd({ productName, productAmount, "shopList": {shopListId }})
//
//     setName('')
//     setAmount('')
//     setShopListId(1)
//   }
//
//     return (
//
//         <>
//             <div className={"container"}>
//                 <form className='add-form' onSubmit={onSubmit}>
//                 <div className={'one-product'}>
//                     <div className={'name-product'}>
//                         <input
//                     type='text'
//                     placeholder='Add Product'
//                     value={productName}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                     </div>
//                     <div className={'amount-product'}>
//                         <input
//                     type='text'
//                     placeholder='Amount'
//                     value={productAmount}
//                     onChange={(e) => setAmount(e.target.value)}
//                 />
//                     </div>
//                     <div className={'delete-product'}>
//                         <input type='submit' value='Save' className='btn'/>
//                     </div>
//                 </div>
//                     </form>
//             </div>
//         </>
//
//
//
//
//
//     );
// }
//
// export default NewProduct;


