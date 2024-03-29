import { Component } from "react";
import { CartItemModel } from "../../store/cart/cart.types";
import './cart-item.style.scss';

class CartItem extends Component<{cartItem:CartItemModel}>{
    
    render(){ 
        const {name, quantity, imageUrl, price}  = this.props.cartItem;
        return (
            <div className="cart-item-container">
                <img src={imageUrl} alt={`${name}`}/>
                <div className="item-details">
                    <span className="name">{name}</span>
                    <span className="price"> {quantity} X {price}</span>
                </div>
            </div>
        );
    }
}

export default CartItem;