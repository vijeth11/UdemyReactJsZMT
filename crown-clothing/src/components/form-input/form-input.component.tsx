import { Component, InputHTMLAttributes } from "react";
import './form-input.style.scss';

type InputFormProps = {
    label:string 
} & InputHTMLAttributes<HTMLInputElement>;

class FormInput extends Component<InputFormProps,{}>{
    render(){
        const {label, ...otherProps} = this.props;
        return(
            <div className="group">
                <input className="form-input" {...otherProps} />
                { 
                label &&
                <label className={`${otherProps.value?.toString().length ? 'shrink':''} form-input-label`}>{label}</label>
                }                
            </div>
        );
    }
}

export default FormInput;