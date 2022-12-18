import { Component } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import './product-card.style.scss';

class ProductCardComponent extends Component{

    handleClick = () => {
        this.context.addItemToCart(this.props.productData);
     }
    render(){
        let {productData} = this.props;
        const {name, price, imageUrl} = productData;
        return(
            <div className="product-card-container">
                <img src={imageUrl} alt={`${name}`}/>
                <div className="footer">
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </div>
                <Button buttonType='inverted' onClick = {this.handleClick}>Add to Cart</Button>
            </div>
        );
    }
}
ProductCardComponent.contextType = CartContext;
export default ProductCardComponent;