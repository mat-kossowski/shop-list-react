import Product from './Product';
import './product.css';

const Products = ({products, onDelete, onToggle}) => {

    return (
        <div className={"products"}>

            {products.map((product, index) => (
                <Product key={index} product={product} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </div>
    );
}

export default Products;