import { Component } from "react";
import './categories.styles.scss';
import CategoryItem from "../category-item/category-item.component";

class Categories extends Component{

    render(){
        return (
            <div className='categories-container'> 
                {this.props.categories.map((item) => (        
                    <CategoryItem key = {item.id} category={item}/>
                ))}
            </div>
        );
    }
}

export default Categories;