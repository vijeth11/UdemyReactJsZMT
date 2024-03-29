import {Component} from 'react';
import { DirectoryItemModel } from '../../store/cart/cart.types';
import './directory-item.styles.scss';

class DirectoryItem extends Component<{category:DirectoryItemModel}>{

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