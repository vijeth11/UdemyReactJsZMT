import { Component } from "react";
import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';
export default class Spinner extends Component{
    render(){
        return (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        );
    }
}