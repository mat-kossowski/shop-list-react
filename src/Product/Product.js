import React from "react";


function Product({product, onDelete, clickDeleteItem, index, clickStatusProduct, updateProductStatus}) {
    return (
        <div>
            <div className={"productDiv"} onClick={() => {
                updateProductStatus(product.productId)
                clickStatusProduct(index, product.productId)
            }}>
                {(product.productStatus)
                    ?
                    <s>{product.productName}</s>
                    :
                    <p>{product.productName}</p>
                }
            </div>
            <div className={"buttonDiv"}>
                <button onClick={() => {
                    onDelete(product.productId)
                    clickDeleteItem(index, product.productId)
                }
                }> DELETE
                </button>
            </div>
        </div>
    );
}

export default Product;
