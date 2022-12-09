import { Component } from "react";
import './form-input.style.scss';
class FormInput extends Component{
    render(){
        const {label, ...otherProps} = this.props;
        return(
            <div className="group">
                <input className="form-input" {...otherProps} />
                { 
                label &&
                <label className={`${otherProps.value.length ? 'shrink':''} form-input-label`}>{label}</label>
                }                
            </div>
        );
    }
}

export default FormInput;