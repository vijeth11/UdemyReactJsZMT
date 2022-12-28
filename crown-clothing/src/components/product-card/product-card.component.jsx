import { Component } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../store/cart/cart.action";
import { withParams } from "../../utils/util/withParams.util";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './product-card.style.scss';

class ProductCardComponent extends Component{

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

export default withParams(ProductCardComponent, ()=>({dispatch: useDispatch()}));