import React, { Component, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCardComponent from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { CategoriesContext } from "../../context/categories.context";
import { CategoryItem } from "../../store/cart/cart.types";
import { withParams } from "../../utils/util/withParams.util";
import './category.style.scss';

type CategoryRouteParams = {
    category:string;
}

class Category extends Component<{params?:CategoryRouteParams},{}>{
    category:string = '';
    static contextType = CategoriesContext;
    context!:React.ContextType<typeof CategoriesContext>;

    componentDidMount(){
        this.category = this.props.params?.category ?? '';
        // to call render once the category is set from params
        this.setState({});
    }

    render(){        
        const {categoriesMap, loading} = this.context;
        const products:CategoryItem[] = this.category.length > 0 ? categoriesMap[this.category]: [];
        return (
            <Fragment>
                { 
                loading ? <Spinner/>:
                <Fragment>
                    <h2 className="category-title">{this.category && this.category.toUpperCase()}</h2>
                    <div className="category-container">
                        
                        {
                            products && products.map(
                                (product:CategoryItem) => <ProductCardComponent key={product.id} productData={product}/>
                                )
                        }
                    </div>
                </Fragment>
                }
            </Fragment>
        );
    }
}

export default withParams(Category,()=>({params:useParams<keyof CategoryRouteParams>() as CategoryRouteParams}));