import { Component } from "react";
import { CartContext } from "../../context/cart.context";
import './checkout-item.style.scss';

class CheckoutItem extends Component{
    render() {
        // &#x2715;  (dingbats)
        const {clearItemFormCart, addItemToCart, removeItemFromCart} = this.context;
        const {name, imageUrl, price, quantity} = this.props.cartItem;
        return (
            <div className="checkout-item-container">
                <div class="image-container">
                    <img src={imageUrl} alt={`${name}`}/>
                </div>
                <span className="name">{name}</span>
                <span className="quantity">
                    <div className="arrow" onClick={() => removeItemFromCart(this.props.cartItem)}>&#10094;</div>
                    <span className="value">{quantity}</span>
                    <div className="arrow" onClick={() => addItemToCart(this.props.cartItem)}>&#10095;</div></span>
                <span className="price">{price}</span>
                <div className="remove-button" onClick={() => clearItemFormCart(this.props.cartItem)}>&#x2716; </div> 
            </div>
        );
    }
}
CheckoutItem.contextType = CartContext;
export default CheckoutItem;