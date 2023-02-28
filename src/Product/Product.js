import React, {useState} from "react";
import edit from '../../src/image/edit.png'
import iconDelete from '../../src/image/delete.png'
import ProductService from "./product.service";
import {useNavigate, useParams} from "react-router-dom";





function Product({product, onDelete, clickDeleteItem, clickStatusProduct, updateProductStatus}) {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    const {shopListId} = useParams();

    const initial = {
        productName: product.productName,
        productAmount: product.productAmount,
        productUnit: product.productUnit
    };

    const [form, setForm] = useState(initial);


    const {productName, productAmount, productUnit} = form;

    const handleUpdateItem = (e) => {
        // e.preventDefault();
        ProductService.updateProduct({
            productId: product.productId,
            productName: productName,
            productAmount: productAmount,
            productUnit: productUnit
        })
            .then(res => {
                console.log("Request complete! response:", res);
            }).catch((error) => {
            console.log("creating message error", error);
        });

        toggleEditMode();


    }

    const reload = () =>{
        let newForm = form
     console.log(newForm)
        if (newForm.productName !== "") {
        } else {
            newForm.productName = "Nazwa"
        }

        setForm(newForm)
        console.log(newForm)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(()=> {
            return {
                ...form, [name]: value
            };
        });
    }
    function handleChangeName(e) {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        if(value === ""){
            setForm(()=> {
                return {
                    ...form, [name]: ""
                };
            });
        }else{
            setForm(()=> {
                return {
                    ...form, [name]: value
                };
            });
        }

    }

    return (

        <div>
            {editMode ? (
                <div >
                    <form className={"product"} onSubmit={handleUpdateItem}>
                        <input className={"productDiv"}
                               type="text"
                               name="productName"
                               placeholder="productName"
                               onChange={handleChangeName}
                               value={productName}
                               required
                        />
                        <input className={"productAmount"}

                            type="number"
                            name="productAmount"
                            placeholder="productAmount"
                            value={productAmount}
                            onChange={handleChange}
                            required
                        />
                        <input className={"productUnit"}
                            type="text"
                            name="productUnit"
                            placeholder="productUnit"
                            value={productUnit}
                            onChange={handleChange}
                            required
                        />
                        <div className={"MyIconsProduct"}>
                            <button className={"MyIconProduct"} onClick={()=>{
                                handleUpdateItem()
                                reload()
                            }}>
                                Update
                            </button>


                            <button className={"MyIconProduct"} onClick={toggleEditMode}>
                                Cancel
                            </button>
                            <button className={"MyIconCategory"}>
                                {product.category}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (


                <div className={"product"}>
                    <div className={"productDiv"} onClick={() => {
                        updateProductStatus(product.productId)
                        clickStatusProduct(product.productId)
                    }}>
                        {(product.productStatus)
                            ?
                            <s>{productName}</s>
                            :
                            <p>{productName}</p>
                        }
                    </div>
                    <div className={"productAmount"}>
                        {productAmount}
                    </div>
                    <div className={"productUnit"}>
                        {productUnit}
                    </div>
                    <div className={"MyIconsProduct"}>
                        <button className={"MyIconProduct"} onClick={toggleEditMode}>

                            <img className={"IconImageProduct"}  src={edit} alt={'shopping list'}/>
                        </button>


                        <button className={"MyIconProduct"} onClick={() => {
                            onDelete(product.productId)
                            clickDeleteItem(product.productId)
                        }}>
                            <img className={"IconImageProduct"} src={iconDelete} alt={'shopping list'}/>
                        </button>
                        <button className={"MyIconCategory"} >
                            {product.category}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Product;
