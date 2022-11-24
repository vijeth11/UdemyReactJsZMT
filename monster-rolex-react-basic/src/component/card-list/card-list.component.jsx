import React from "react";
import './card-list.styles.css';
import { Card } from '../card/card.component';

export const CardList = (props) => {
    console.log(props);
    //props contains all the inputs passed to the component 
    //props.children will contain the html elements defined between this component selectors whenever used (ex:app.js)
    //
    return (
    <div className='card-list'>{
        props.monsters.map(monster => {           
            return (<Card key={monster.id} monster = {monster}></Card>)
        })
      }</div>
    );
}

//Note:
/*
* Also keep in mind that React component names must be capitalized.
*/