import {React,Component} from 'react';
import { CardList } from './component/card-list/card-list.component';
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state={
      string:'Hello vijeth',
      monsters:[]
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(response => {this.setState({...this.state, monsters:response}); console.log(response);})
  }

  render(){
    return(
    <div className="App">
      <CardList name="test">
        <h1>Test</h1>
      </CardList>
     {
       this.state.monsters.map(monster => {
          return (<h1 key={monster.id}> {monster.name }</h1>)
       })
     }
   </div>
   ); 
  }
}

//Note: Why cant we update the state directly?

/* the reason why setState needs to be called if we want to update a state bcz
data modification in react works in a unidirection. So when a click event happens 
react listenes to it and checks for what needs to be done. Once it finds out they have called setState 
it executes this method. In this method it uses new value of state passed as argument and updates the 
state object. After that it calls render function so that react can now use the updated state object and 
re-render dom with new changes. Due to this it is mandatory to update state via setState method and not directly.
We can only set state directly in constructor because it calls render automatically in constructor for first time.
*/

/*
 react needs keyword 'key'  when dealing with list is because. It gives react a knowledge to re-render only the part 
 of the html with the 'key' for which data has been changed in the state by a function or third party due to which the
 heavy lifting of re-rendering each and every elemnt in the list just for change of one elemnt in an array is escaped
 thus making react smoother. 
*/
export default App;
