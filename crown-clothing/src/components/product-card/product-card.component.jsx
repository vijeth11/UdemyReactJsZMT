import { Component } from "react";
import Button from "../button/button.component";
import './product-card.style.scss';

class ProductCardComponent extends Component{

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
                <Button buttonType='inverted'>Add to Cart</Button>
            </div>
        );
    }
}

export default ProductCardComponent;