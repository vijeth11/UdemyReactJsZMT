import { Component } from "react";
import './directories.styles.scss';
import DirectoryItem from "../directory-item/directory-item.component";

class Directories extends Component{

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