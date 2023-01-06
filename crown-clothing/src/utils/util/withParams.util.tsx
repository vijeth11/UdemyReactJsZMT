import { Component, FunctionComponent } from "react"

export function withParams<P extends {}>(UserComponent:typeof Component , extraProps:() => P):FunctionComponent{
    return (props:{}) => <UserComponent {...props} {...extraProps()}/>;
}