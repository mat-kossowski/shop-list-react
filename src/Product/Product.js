import React, {useEffect} from "react";
import {useParams} from "react-router-dom";



function Product({product, onDelete,clickDeleteItem, index, clickStatusProduct, updateProductStatus}){
    return(
        <div>
            <div onClick={()=>{
                updateProductStatus(product.productId)
                clickStatusProduct(index, product.productId)
            }}>
            {(product.productStatus )
                ?
                <s>{product.productName}</s>
            :
                <p>{product.productName}</p>
            }
        </div>

            <button  onClick={()=>{
                onDelete(product.productId)
                clickDeleteItem(index, product.productId)
            }
            }> DELETE</button>
        </div>
    );
}
export default Product;
