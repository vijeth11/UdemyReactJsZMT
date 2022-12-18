import { Component } from "react";
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { CartContext } from "../../context/cart.context";
import './cart-icon.style.scss';

class CartIcon extends Component{
    render(){
        const {setIsCartOpen, isCartOpen, cartCount} = this.context;
        return(            
            <div className="cart-icon-container" onClick={() => setIsCartOpen(!isCartOpen)}>
                <ShoppingIcon className="shopping-icon"/>
                <span className="item-count">{cartCount}</span>
            </div>
        );
    }
}
CartIcon.contextType = CartContext;
export default CartIcon;