import {Component} from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import SignIn from './routes/signIn/sign-in.component';

class App extends Component{
  render() {
    return (
      <Routes>
        <Route path = '/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='sign-in' element={<SignIn/>}/>
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
*/
export default App;