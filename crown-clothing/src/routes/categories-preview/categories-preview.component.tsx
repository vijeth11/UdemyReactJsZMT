import { Component, Context, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { CategoriesContext } from "../../context/categories.context";

class CategoriesPreview extends Component{
    static contextType = CategoriesContext;
    context!:React.ContextType<typeof CategoriesContext>;

    render(){
        let {categoriesMap, loading} = this.context;
        return (
            <Fragment>
                {
                   loading? <Spinner/>: Object.keys(categoriesMap).map(title =>{ 
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} title={title} products={products}/>
                    })
                }                
            </Fragment>
        );
    }
}

export default CategoriesPreview;