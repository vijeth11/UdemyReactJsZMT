import React from 'react';
import './card.styles.css';

export const Card = (prop) => {
    return (
        <div className='card-container'>
            <img alt="monster" src={`https://robohash.org/${prop.monster.id}?set=set2&size=180x180`}/>
            <h1>{ prop.monster.name }</h1>
            <p>{ prop.monster.email }</p>
        </div>
    );
}