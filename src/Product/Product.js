import React, {useState} from "react";
import edit from '../../src/image/edit.png'
import iconDelete from '../../src/image/delete.png'
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
    const handleChange = appService.handleChange(setForm, form)

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
                <div>
                    <form className={"product"} onSubmit={handleUpdateItem}>
                        <input className={"productDiv"}
                               type="text"
                               name="productName"
                               placeholder="productName"
                               onChange={handleChangeName}
                               value={productName}
                               required
                        />
                        <input className={"inputProductAmount"}
                               type="number"
                               name="productAmount"
                               placeholder="productAmount"
                               value={productAmount}
                               onChange={handleChange}
                               required
                        />
                        <input className={"inputProductUnit"}
                               type="text"
                               name="productUnit"
                               placeholder="productUnit"
                               value={productUnit}
                               onChange={handleChange}
                               required
                        />
                        <div className={"myIconsProduct"}>
                            <button className={"myIconProduct"} onClick={() => {
                                handleUpdateItem()
                                reload()
                            }}>
                                Update
                            </button>
                            <button className={"myIconProduct"} onClick={toggleEditMode}>
                                Cancel
                            </button>
                            <button className={"myIconCategory"}>
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
                    <div className={"inputProductAmount"}>
                        {productAmount}
                    </div>
                    <div className={"inputProductUnit"}>
                        {productUnit}
                    </div>
                    <div className={"myIconsProduct"}>
                        <button className={"myIconProduct"} onClick={toggleEditMode}>
                            <img className={"iconImageProduct"} src={edit} alt={'shopping list'}/>
                        </button>
                        <button className={"myIconProduct"} onClick={() => {
                            onDelete(product.productId)
                            clickDeleteItem(product.productId)
                        }}>
                            <img className={"iconImageProduct"} src={iconDelete} alt={'shopping list'}/>
                        </button>
                        <button className={"myIconCategory"}>
                            {product.category}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Product;
