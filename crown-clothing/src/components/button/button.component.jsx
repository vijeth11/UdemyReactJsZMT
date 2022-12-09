import { Component } from "react";
import './button.style.scss';

class Button extends Component{
    BUTTON_TYPE_CLASSES = {
        google: 'google-sign-in',
        inverted: 'inverted'
    }

    render(){
        const {children, buttonType, ...otherProps} = this.props;
        return <button 
                className={`button-container ${this.BUTTON_TYPE_CLASSES[buttonType]}`} 
                {...otherProps}>
                    {children}
                </button>
    }
}

export default Button;