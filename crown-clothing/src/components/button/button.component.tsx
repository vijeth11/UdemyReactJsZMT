import { Component } from "react";
import './button.style.jsx';
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from "./button.style.jsx";

export enum BUTTON_TYPE_CLASSES {
    google= 'google-sign-in',
    inverted= 'inverted',
    base= 'base'
};
class Button extends Component<{children:Component, buttonType:BUTTON_TYPE_CLASSES, isLoading:boolean,otherProps:any}>{
    
    getButton(buttonType = BUTTON_TYPE_CLASSES.base) {
        return {
            [BUTTON_TYPE_CLASSES.base]:BaseButton,
            [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
            [BUTTON_TYPE_CLASSES.inverted]:InvertedButton

        }[buttonType];
    }

    render(){
        const {children, buttonType, isLoading,...otherProps} = this.props;
        const CustomButton = this.getButton(buttonType);
        return <CustomButton 
                disabled={isLoading}
                {...otherProps}>
                    {isLoading? <ButtonSpinner/>:children}
                </CustomButton>
    }
}

export default Button;