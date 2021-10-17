import React from "react";
import './card-list.styles.css';
export const CardList = (props) => {
    console.log(props);
    //props constains all the inputs passed to the component 
    //props.children will contain the html elements defined between this component selectors whenever used (ex:app.js)
    //
    return (<div className='card-list'>{props.children}</div>);
}