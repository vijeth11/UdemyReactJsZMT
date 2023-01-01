import { Component, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { withParams } from "../../utils/util/withParams.util";
import {LogoContainer, NavigationContainer, NavLinks,  NavLink} from './navigation.styles.jsx';

class Navigation extends Component{

 
  handleSignOut = async ()=>{
    this.props.dispatch(signOutStart());
  }

    render(){
      const {currentUser, isCartOpen} = this.props;
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
  export default withParams(Navigation,()=>(
    {
      currentUser:useSelector(selectCurrentUser), 
      isCartOpen: useSelector(selectIsCartOpen),
      dispatch:useDispatch()
    }));