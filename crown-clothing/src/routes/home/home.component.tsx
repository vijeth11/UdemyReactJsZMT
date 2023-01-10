import { Component } from "react";
import { Outlet } from "react-router-dom";
import Directories from "../../components/Directories/directories.component";
import { DirectoryItemModel } from "../../store/cart/cart.types";

class Home extends Component{
    categories:DirectoryItemModel[] = [
        {
          "id": 1,
          "title": "hats",
          "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "jackets",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "sneakers",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        },
        {
          "id": 4,
          "title": "womens",
          "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
        },
        {
          "id": 5,
          "title": "mens",
          "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
        }
      ]

    render(){
        return( 
            <div>
                <Outlet></Outlet>                
                <Directories categories={this.categories}/>
            </div>
            );
    }
}

export default Home;