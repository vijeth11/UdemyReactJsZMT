import { Component, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { addCartItem } from "../../store/cart/cart.action";
import { CategoryItem } from "../../store/cart/cart.types";
import { withParams } from "../../utils/util/withParams.util";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './product-card.style.scss';
type ProductCardComponentProps = {dispatch:Dispatch<AnyAction>;productData:CategoryItem;}

class ProductCardComponent extends Component<ProductCardComponentProps>{

    handleClick = () => {
        this.props.dispatch(addCartItem(this.props.productData));
     }
    render(){
        let {productData} = this.props;
        const {name, price, imageUrl} = productData;
        return(
            <div className="product-card-container">
                <img src={imageUrl} alt={`${name}`}/>
                <div className="footer">
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </div>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick = {this.handleClick}>Add to Cart</Button>
            </div>
        );
    }
}

export default withParams<{},{productData:CategoryItem}>(ProductCardComponent, ()=>({dispatch: useDispatch()}));