import { Component, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCardComponent from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import './category.style.scss';

const withParams = (Component) => {
    return props => <Component {...props} params = {useParams()} />
} 

class Category extends Component{
    constructor(){
        super();
        this.state = {
            products:[]
        };
    }

    componentDidMount(){
        this.category = this.props.params.category;
        const {categoriesMap} = this.context;
        this.setState({products:categoriesMap[this.category]});
    }
    render(){        
        const {products} = this.state;
        return (
            <Fragment>
                <h2 className="category-title">{this.category && this.category.toUpperCase()}</h2>
                <div className="category-container">
                    
                    {
                        products && products.map(
                            (product) => <ProductCardComponent key={product.id} productData={product}/>
                            )
                    }
                </div>
            </Fragment>
        );
    }
}
Category.contextType = CategoriesContext;
export default withParams(Category);