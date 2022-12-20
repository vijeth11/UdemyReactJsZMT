import { Component, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../context/categories.context";

class CategoriesPreview extends Component{
    render(){
        let {categoriesMap} = this.context;
        return (
            <Fragment>
                {
                    Object.keys(categoriesMap).map(title =>{ 
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} title={title} products={products}/>
                    })
                }                
            </Fragment>
        );
    }
}

CategoriesPreview.contextType = CategoriesContext;
export default CategoriesPreview;