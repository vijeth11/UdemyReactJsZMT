import { Component } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { withParams } from "../../utils/util/withParams.util";
import './checkout.style.scss';

class Checkout extends Component{

    render(){
        const {cartItems, cartTotal}  = this.props;
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
                
                <PaymentForm/>
            </div>
        );
    }
}

export default withParams(Checkout,() =>(
    {
        cartItems:useSelector(selectCartItems), 
        cartTotal:useSelector(selectCartTotal)
    }));