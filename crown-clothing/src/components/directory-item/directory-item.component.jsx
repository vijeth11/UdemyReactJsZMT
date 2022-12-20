import {Component} from 'react';
import './directory-item.styles.scss';

class DirectoryItem extends Component{

    render(){
        const category = this.props.category;
        return (
        <div className='directory-item-container'>
            <div className='background-image' style={{backgroundImage:`url(${category.imageUrl})`}}/>
            <div className='body'>
              <h2>{category.title}</h2>
              <p>Shop Now</p>
            </div>
        </div>);
    }
}

export default DirectoryItem;