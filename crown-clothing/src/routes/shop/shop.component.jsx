import { Component } from "react";
import ProductCardComponent from "../../components/product-card/product-card.component";
import { ProductContext } from "../../context/product.context";
import './shop.style.scss';
class Shop extends Component{

    render(){
        let shop_data = this.context;
        return (
            <div className="products-container">
                {
                    shop_data.map(product => (
                        <ProductCardComponent key={product.id} productData={product}></ProductCardComponent>)
                        )
                }
            </div>
        );
    }
}
Shop.contextType = ProductContext;
export default Shop;