import { Component } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.style.scss';
class CartDropdown extends Component{
    render(){
        const {cartItems }  = this.context;
        return (
            <div className="cart-dropdown-container">
                <div className="cart-items">
                    {
                        cartItems.map(item => <CartItem key = {item.id} cartItem = {item}/>)
                    }
                </div>
                <Button>GO TO CHECKOUT</Button>
            </div>
        );
    }
}

CartDropdown.contextType = CartContext;
export default CartDropdown