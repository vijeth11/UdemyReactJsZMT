import React, { ChangeEventHandler } from "react";
import './search-box.component.css';

interface ISearchBoxProps{
    placeholder?:string; 
    handleChange:ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput = (props:ISearchBoxProps) => {
    return (
        <input 
        className = 'search' 
        type='search'
         placeholder={props.placeholder} 
         onChange={props.handleChange}/>
    );
}