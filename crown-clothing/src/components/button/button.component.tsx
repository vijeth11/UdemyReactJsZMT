import { ButtonHTMLAttributes, Component } from "react";
import './button.style';
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from "./button.style";

export enum BUTTON_TYPE_CLASSES {
    google= 'google-sign-in',
    inverted= 'inverted',
    base= 'base'
};

type ButtonProps = {
    buttonType?:BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
class Button extends Component<ButtonProps,{}>{
    
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