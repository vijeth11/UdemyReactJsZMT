import { Component } from "react";
import './directories.styles.scss';
import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryItemModel } from "../../store/cart/cart.types";

class Directories extends Component<{categories:DirectoryItemModel[]}>{

    render(){
        return (
            <div className='directories-container'> 
                {this.props.categories.map((item) => (        
                    <DirectoryItem key = {item.id} category={item}/>
                ))}
            </div>
        );
    }
}

export default Directories;