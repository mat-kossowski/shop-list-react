import React, {useState} from "react";
import edit from '../../src/image/update.png'
import iconDelete from '../../src/image/kosz.png'
import checkBox from '../image/checkbox1.png'
import cancel from '../image/cancel.png'
import ProductService from "./product.service";
import appService from "../service/app.service";


function Product({product, onDelete, clickDeleteItem, clickStatusProduct, updateProductStatus}) {
    const [editMode, setEditMode] = useState(false);


    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const initial = {
        productName: product.productName,
        productAmount: product.productAmount,
        productUnit: product.productUnit
    };

    const [form, setForm] = useState(initial);
    const {productName, productAmount, productUnit} = form;

    const reload = appService.reload(setForm, form)
    const handleChangeName = appService.handleChangeName(setForm, form)
    const handleChange = appService.handleChangeName(setForm, form)

    const handleUpdateItem = () => {
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


    return (

        <div>
            {editMode ? (

                    <form className={"product"} onSubmit={handleUpdateItem}>


                        <div className={"productName"}>
                            <input className={"productName"}
                                   type="text"
                                   name="productName"
                                   placeholder="productName"
                                   onChange={handleChangeName}
                                   value={productName}
                                   required
                            />
                        </div>
                        <div className={"productAmount"}>
                            <input
                                   type="number"
                                   name="productAmount"
                                   placeholder="productAmount"
                                   value={productAmount}
                                   onChange={handleChange}
                                   required
                            />
                        </div>
                        <div className={"productUnit"}>
                            <input
                                   type="text"
                                   name="productUnit"
                                   placeholder="productUnit"
                                   value={productUnit}
                                   onChange={handleChange}
                                   required
                            />
                        </div>


                        <div className={"updateProduct"}>
                            <button  onClick={() => {
                                handleUpdateItem()
                                reload()
                            }}>
                                <img  src={checkBox} alt={'shopping list'}/>
                            </button>
                        </div>
                        <div className={"deleteProductNew"}>
                            <button  onClick={toggleEditMode}>
                                <img  src={cancel} alt={'shopping list'}/>
                            </button>
                        </div>

                        <div className={"categoryProductNew"}>

                            <p>{product.category}</p>

                        </div>
                    </form>

            ) : (
                <>
                    {(product.productStatus)
                        ?

                        <div className={"product"} style={{background: "grey"}}>
                            <div className={"productName"} onClick={() => {
                                updateProductStatus(product.productId)
                                clickStatusProduct(product.productId)
                            }}>
                                <p>{productName}</p>
                            </div>
                            <div className={"productAmount"}>
                                <p>{productAmount}</p>
                            </div>
                            <div className={"productUnit"}>
                                <p>{productUnit}</p>
                            </div>

                            <div className={"updateProduct"}>
                                <button  onClick={toggleEditMode}>
                                    <img src={edit} alt={'shopping list'}/>
                                </button>
                            </div>
                            <div className={"deleteProductNew"}>
                                <button  onClick={() => {
                                    onDelete(product.productId)
                                    clickDeleteItem(product.productId)
                                }}>
                                    <img  src={iconDelete} alt={'shopping list'}/>
                                </button>
                            </div>
                            <div className={"categoryProductNew"}>
                                <p>
                                    {product.category}</p>
                            </div>
                        </div>

                        :
                        <div className={"product"} >
                            <div className={"productName"} onClick={() => {
                                updateProductStatus(product.productId)
                                clickStatusProduct(product.productId)
                            }}>
                                <p>{productName}</p>
                            </div>
                            <div className={"productAmount"}>
                                <p>{productAmount}</p>
                            </div>
                            <div className={"productUnit"}>
                                <p>{productUnit}</p>
                            </div>
                            <div className={"updateProduct"}>
                                <button  onClick={toggleEditMode}>
                                    <img  src={edit} alt={'shopping list'}/>
                                </button>
                            </div>
                            <div className={"deleteProductNew"}>
                                <button  onClick={() => {
                                    onDelete(product.productId)
                                    clickDeleteItem(product.productId)
                                }}>
                                    <img  src={iconDelete} alt={'shopping list'}/>
                                </button>
                            </div>
                            <div className={"categoryProductNew"}>
                                <p>{product.category}</p>
                            </div>
                        </div>
                    }
                </>

            )}

        </div>
    );
}

export default Product;
