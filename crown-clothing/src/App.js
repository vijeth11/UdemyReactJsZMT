import {Component} from 'react';
import { useDispatch } from 'react-redux';
import {Route, Routes } from 'react-router-dom';
import Authentication from './routes/Authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import { setCurrentUser } from './store/user/user.action';
import { createUserDocumentFromAuth, onAuthStateChangedListner } from './utils/firebase/firebase.utils';
import { withParams } from './utils/util/withParams.util';

class App extends Component{

  componentDidMount(){
    this.unSubscribe = onAuthStateChangedListner((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      this.props.dispatch(setCurrentUser(user));
    });
  }

  componentWillUnmount(){
    if(this.unSubscribe)this.unSubscribe();
  }

  render() {
    return (
      <Routes>
        <Route path = '/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='shop/*' element={<Shop/>}/>
          <Route path='auth' element={<Authentication/>}/>
          <Route path='checkout' element={<Checkout/>}/>
        </Route>
      </Routes>      
    );
  }
}

/* 
Routes takes a list Route elemnt with the path and element attribute. Path attribute represents the url path 
and element contains the component that needs to be rendered when the path is reached by user in the browser

Route can have nested Route or children Routes which will be rendered when the child path is reached.
for example 
  <Route path='/home' element = {<Home/>}>
    <Route path='shop' element= {<Shop/>}/>
  </Route>
in the above sample to reach to shop we need to go to /home/shop.But even when we reach this path the content of 
Home component will be renderd but not of the Shop. In order to see the content of the Shop we need to add a component
in render part of Home Component called Outlet like bellow
<div>
  <h1> I am Home</h1>
  <Outlet/>
</div>
the conetnt of the Shop will be rendered in place of Outlet same like ReouterOutlet in Angular.

if you want the first child route to be displayed whenever the path of only parent is reached then 
instead of path the attribute in child Route use index like 
<Route index element = {<Shop/>} />
this will render the content of the Shop component in place of Outlet Tag along with content of parent 
componet whenever the parent path is reached. 
note: If you define multiple index children routes only first will be rendered

Context is used to store data at app level so any leaf node (component) can use it by calling context.
Instead of having to pass the data to parent components all the way up to app and then to child component
in sibbling component via props which is too much data passing between component which does not need them.
This is similar to using Store/Service in angular. 

To Pass MultipleContext to a Component we need to wrap the component with extra ContextConsumer and pass the context 
value as an attribute (ex: NavigationComponent) 

we can have nested routes inside of a component but we need to provide a wild path with '*' in main route like Shop
Inside Shop we have multiple child route wrapped with routes component.

Styled Component is a library used to convert styles into a component and use them in the Component 
look at Button and Navigation component for sample
*/
export default withParams(App,()=>({dispatch:useDispatch()}));
