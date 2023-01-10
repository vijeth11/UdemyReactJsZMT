import { Component } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.style.scss';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { withParams } from "../../utils/util/withParams.util";
import { CartItemModel } from "../../store/cart/cart.types";

type CartDropdownProps = {
    cartItems?:CartItemModel[]
}

class CartDropdown extends Component<CartDropdownProps,{navigate:boolean}>{

    constructor(){
        super({});
        this.state = { navigate: false};
    }
    handleClick = () => {
        this.setState({navigate:true})
    }

    render(){
        const {cartItems }  = this.props;
        return (
            <div className="cart-dropdown-container">
                <div className="cart-items">
                    {
                        cartItems?.length ? 
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

export default withParams(CartDropdown,()=>({cartItems: useSelector(selectCartItems)}))