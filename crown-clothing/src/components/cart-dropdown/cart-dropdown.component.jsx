import { Component } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.style.scss';
import { Navigate } from "react-router-dom";
class CartDropdown extends Component{

    constructor(){
        super();
        this.state = { navigate: false};
    }
    handleClick = () => {
        this.setState({navigate:true})
    }

    render(){
        const {cartItems }  = this.context;
        return (
            <div className="cart-dropdown-container">
                <div className="cart-items">
                    {
                        cartItems.length ? 
                        cartItems.map(item => <CartItem key = {item.id} cartItem = {item}/>) 
                        : (<span className="empty-message">Your Cart is empty</span>)
                    }
                </div>
                {this.state.navigate && <Navigate to="/checkout" replace={true} />}
                <Button onClick={this.handleClick}>GO TO CHECKOUT</Button>
            </div>
        );
    }
}

CartDropdown.contextType = CartContext;
export default CartDropdown