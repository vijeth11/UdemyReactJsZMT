import './card-list.styles.css';
import { Card } from '../card/card.component';
import { CardProps, Monster } from '../../types/types';

export const CardList = (props:CardProps) => {
    console.log(props);
    //props contains all the inputs passed to the component 
    //props.children will contain the html elements defined between this component selectors whenever used (ex:app.js)
    //
    return (
    <div className='card-list'>{
        props.monsters.map((monster:Monster) => {           
            return (<Card key={monster.id} monster = {monster}></Card>)
        })
      }</div>
    );
}

//Note:
/*
* Also keep in mind that React component names must be capitalized.
*/