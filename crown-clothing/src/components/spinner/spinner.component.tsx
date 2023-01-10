import { Component } from "react";
import { SpinnerContainer, SpinnerOverlay } from './spinner.style';
export default class Spinner extends Component{
    render(){
        return (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        );
    }
}