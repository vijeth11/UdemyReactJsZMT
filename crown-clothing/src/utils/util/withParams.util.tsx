import { Component, FunctionComponent } from "react"

export function withParams<P extends {}, T extends {}>(UserComponent:typeof Component , extraProps:() => P):FunctionComponent<T>{
    return (props:T) => <UserComponent {...props} {...extraProps()}/>;
}