import { Component, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {LogoContainer, NavigationContainer, NavLinks,  NavLink} from './navigation.styles.jsx';

class Navigation extends Component{

 
  handleSignOut = async ()=>{
    await signOutUser();
  }

    render(){
      const {currentUser} = this.context;
      const {isCartOpen} = this.props.cartContext;
      return (
        <Fragment>
          <NavigationContainer>
            <LogoContainer to="/">
                <CrownLogo className="logo"></CrownLogo>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>Shop</NavLink>
                {
                  currentUser ? (<NavLink as='span' onClick={this.handleSignOut}>SIGN OUT</NavLink>):
                  (<NavLink to='/auth'>SIGN IN</NavLink>)
                }
                <CartIcon/>                
            </NavLinks>
            {
              isCartOpen && <CartDropdown/>
            }
          </NavigationContainer>
          <Outlet/>
        </Fragment>
      );
    }
  }
  Navigation.contextType = UserContext;
  export default Navigation;