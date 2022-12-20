import { Component } from "react";
import { Link } from "react-router-dom";
import ProductCardComponent from "../product-card/product-card.component";
import './category-preview.style.scss';
class CategoryPreview extends Component{
    render(){
        const {title, products}  = this.props;
        return(
            <div className="category-preview-container">
                <h2>
                    <Link className="title" to={title}>{title.toUpperCase()}</Link>                    
                </h2>
                <div className="preview">
                    {
                        products
                        .filter((_, idx)=> idx < 4)
                        .map((product) => <ProductCardComponent key={product.id} productData={product}/>)
                    }
                </div>
            </div>
        );
    }
}

export default CategoryPreview;