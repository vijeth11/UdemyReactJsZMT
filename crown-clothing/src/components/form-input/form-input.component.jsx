import { Component } from "react";

class FormInput extends Component{
    render(){
        const {label, ...otherProps} = this.props;
        return(
            <div className="group">
            { 
            label &&
            <label className={`${otherprops.value.length ? 'shrink':''} form-input-label`}>{label}</label>
            }
            <input className="form-input" {...otherProps} />
            </div>
        );
    }
}

export default FormInput;