import { Component, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { addCartItem, clearCartItem, removeCartItem } from "../../store/cart/cart.action";
import { CartItemModel } from "../../store/cart/cart.types";
import { withParams } from "../../utils/util/withParams.util";
import './checkout-item.style.scss';

class CheckoutItem extends Component<{dispatch:Dispatch<AnyAction>, cartItem:CartItemModel}>{
    render() {
        // &#x2715;  (dingbats)
        const {dispatch} = this.props;
        const {name, imageUrl, price, quantity} = this.props.cartItem;
        return (
            <div className="checkout-item-container">
                <div className="image-container">
                    <img src={imageUrl} alt={`${name}`}/>
                </div>
                <span className="name">{name}</span>
                <span className="quantity">
                    <div className="arrow" onClick={() => dispatch(removeCartItem(this.props.cartItem))}>&#10094;</div>
                    <span className="value">{quantity}</span>
                    <div className="arrow" onClick={() => dispatch(addCartItem(this.props.cartItem))}>&#10095;</div></span>
                <span className="price">{price}</span>
                <div className="remove-button" onClick={() => dispatch(clearCartItem(this.props.cartItem))}>&#x2716; </div> 
            </div>
        );
    }
}
export default withParams<{},{cartItem:CartItemModel}>(CheckoutItem,() =>({dispatch: useDispatch(),}));