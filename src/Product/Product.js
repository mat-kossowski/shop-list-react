import React from "react";

function Product(props){
    return(
        <div>
            <h3>{props.productName}</h3>
            <div className="center">
                <p>ID: {props.productAmount}</p>
                <p>Content: {props.category}</p>
            </div>
        </div>
    );
}
export default Product;







// import {FaTimes} from 'react-icons/fa'
// import './product.css';
//
// const Product = ({product, onDelete, onToggle}) => {
//
//     return (
//         <>
//             <div className={"container"}>
//                 <div className={'one-product'}>
//                     <div className={'name-product'} onClick={() => onToggle(product.productId)}
//                          style={{
//                              textDecorationLine: `${product.productStatus ? "line-through" : "none"}`
//                              , cursor: "pointer"
//                          }}>
//                         {product.productName}{' '}
//                     </div>
//                     <div className={'amount-product'}>
//                         {product.productAmount}
//                     </div>
//                     <div className={'delete-product'}>
//                         <FaTimes
//                             style={{color: 'red', cursor: 'pointer'}}
//                             onClick={() => onDelete(product.productId)}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//
//     )
// }
//
// export default Product;
