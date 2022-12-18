import { Component, Fragment } from "react";
import { Outlet, Link} from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

class Navigation extends Component{

 
  handleSignOut = async ()=>{
    await signOutUser();
  }

    render(){
      const {currentUser} = this.context;
      const {isCartOpen} = this.props.cartContext;
      return (
        <Fragment>
          <div className="navigation">
            <Link className="logo-container" to="/">
                <CrownLogo className="logo"></CrownLogo>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>Shop</Link>
                {
                  currentUser ? (<span className="nav-link" onClick={this.handleSignOut}>SIGN OUT</span>):
                  (<Link className="nav-link" to='/auth'>SIGN IN</Link>)
                }
                <CartIcon/>                
            </div>
            {
              isCartOpen && <CartDropdown/>
            }
          </div>
          <Outlet/>
        </Fragment>
      );
    }
  }
  Navigation.contextType = UserContext;
  export default Navigation;