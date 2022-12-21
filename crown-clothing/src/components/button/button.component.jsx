import { Component } from "react";
import './button.style.jsx';
import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.style.jsx";

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    base: 'base'
};
class Button extends Component{
    
    getButton(buttonType = BUTTON_TYPE_CLASSES.base) {
        return {
            [BUTTON_TYPE_CLASSES.base]:BaseButton,
            [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
            [BUTTON_TYPE_CLASSES.inverted]:InvertedButton

        }[buttonType];
    }

    render(){
        const {children, buttonType, ...otherProps} = this.props;
        const CustomButton = this.getButton(buttonType);
        return <CustomButton 
                {...otherProps}>
                    {children}
                </CustomButton>
    }
}

export default Button;