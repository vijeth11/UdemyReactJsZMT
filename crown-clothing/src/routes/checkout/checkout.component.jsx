import { Component } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../context/cart.context";
import './checkout.style.scss';

class Checkout extends Component{

    render(){
        const {cartItems, cartTotal}  = this.context;
        return (
            <div className="checkout-container">
                <div className="checkout-header">
                    <div className="header-block">
                        <span>Product</span>
                    </div>
                    <div className="header-block">
                        <span>Description</span>
                    </div>
                    <div className="header-block">
                        <span>Quantity</span>
                    </div>
                    <div className="header-block">
                        <span>Price</span>
                    </div>
                    <div className="header-block">
                        <span>Remove</span>
                    </div>
                </div>
                {
                    cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
                }
                <span className="total">Total: ${cartTotal}</span>
            </div>
        );
    }
}
Checkout.contextType = CartContext;
export default Checkout;