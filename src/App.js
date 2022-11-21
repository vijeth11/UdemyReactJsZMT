import {React,Component} from 'react';
import { CardList } from './component/card-list/card-list.component';
import './App.css';
import { SearchInput } from './component/search-box/search-box.component';

class App extends Component{
  constructor(){
    super();
    this.state={
      searchField:'',
      monsters:[]
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(response => {this.setState({...this.state, monsters:response}); console.log(response);})
  }

  handleChange = (event) => {
    this.setState({...this.state,searchField:event.target.value })
  }

  render(){
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField))
    return(    
    <div className="App">
      <h1> Monsters Rolodex </h1>
      <SearchInput
      placeholder="search monsters" 
      handleChange = {this.handleChange}></SearchInput>
      <CardList monsters={filteredMonsters}></CardList>     
    </div>
   ); 
  }
}

//Note: Why cant we update the state directly?

/* the reason why setState needs to be called if we want to update a state bcz
data modification in react works in a unidirection. So when a click event happens 
react listenes to it and checks for what needs to be done. Once it finds out they have called setState 
it executes this method. In this method it uses new value of state passed as argument and 
shallow updates (change the values in state obj only for keys mentioned in new value) the 
state object. After that it calls render function so that react can now use the updated state object and 
re-render dom with new changes. Due to this it is mandatory to update state via setState method and not directly.
We can only set state directly in constructor because it calls render automatically in constructor for first time.
*/

/*
The content of a React component (usually) needs to contain one root element. If we, for example, try to 
define the component App without the outermost div-element it will throw error
*/

/*
Component can return an array of components as well like:
const App = () => {
  return [
    <h1>Greetings</h1>,
    <Hello name="Maya" age={26 + 10} />,
    <Footer />
  ]
}
instead of returning html
*/

/*
 react needs keyword 'key'  when dealing with list is because. It gives react a knowledge to re-render only the part 
 of the html with the 'key' for which data has been changed in the state by a function or third party due to which the
 heavy lifting of re-rendering each and every elemnt in the list just for change of one elemnt in an array is escaped
 thus making react smoother. 
*/

/*
npm run eject command creates a prod build version of the react application where everything is compiled into js and html 
files. (like ng b --prod in angular)
*/

/*
componentDidMount is the function which is called when the component is mounted for the first time and it just like ngOnInit
in angular. so it runs only once at during component mounting
*/

/*
  order of execution
  Constructor->render->componentDidMount
*/

/*
if a console.log method is added to display state right after the setState method we cannot see the change in the state object
as the setState function is async function we need to pass a callback function as second argument to setState and retrieve new updated state
example setState({...state,searchField:name},() => console.log(this.state))
*/

/*
Arrow function will lexically scope the source class instance to 'this' keyword meaning instance of the class where the arrow function
is defined. on other hand the normal function inside JS class when passed as an argument it does not bing the source class instance to 'this'
keyword used in the function due to where it will throw error when called so in Order to over come this we can add .bind(this) to the function 
while passing as argument so that the source class instance is set as the context of 'this' keyword when called.   
*/
export default App;
