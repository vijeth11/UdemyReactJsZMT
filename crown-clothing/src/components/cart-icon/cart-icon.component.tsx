import { Component, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
// a module needs to be created for TS to recognise SVG file done in custom.d.ts
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { withParams } from "../../utils/util/withParams.util";
import './cart-icon.style.scss';

class CartIcon extends Component<{dispatch:Dispatch<AnyAction>, isCartOpen:boolean, cartCount:number},{}>{
    render(){
        const {dispatch, isCartOpen, cartCount} = this.props;
        console.log(this.props);
        return(            
            <div className="cart-icon-container" onClick={() => dispatch(setIsCartOpen(!isCartOpen))}>
                <ShoppingIcon className="shopping-icon"/>
                <span className="item-count">{cartCount}</span>
            </div>
        );
    }
}

export default withParams(CartIcon, ()=>({
     dispatch: useDispatch(),
    isCartOpen:useSelector(selectIsCartOpen),
    cartCount:useSelector(selectCartCount)
}));