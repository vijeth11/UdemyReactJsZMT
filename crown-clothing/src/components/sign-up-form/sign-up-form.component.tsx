import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { signUpStart } from "../../store/user/user.action";
import { withParams } from "../../utils/util/withParams.util";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
type SignUpFormState = {
    displayName:string;
    email:string;
    password:string;
    confirmPassword:string;
}

class SignUpForm extends Component<{dispatch?: Dispatch<AnyAction>},SignUpFormState>{
    formInitialState = {
        displayName: '',
        email: '',
        password:'',
        confirmPassword:''
    };

    constructor(){
        super({});
        this.state= {...this.formInitialState};
      }

    resetFormFields(){
        this.setState({...this.formInitialState});
    }

    formSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(this.state.password === this.state.confirmPassword){      
            try{  
            // const {user} =  await creatAuthUserWithEmailAndPassword({email:this.state.email, password:this.state.password});
            // await createUserDocumentFromAuth(user,{displayName:this.state.displayName}); 
            if(this.props.dispatch){ 
                this.props.dispatch(signUpStart(this.state.email,this.state.password,this.state.displayName)); 
            }         
            this.resetFormFields();
            }catch(error){
                if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){
                    alert('Cannot create user, email already in use');
                }else{
                    console.log("Fail to login", error);
                }
            }
        }else{
            alert("passwords do not match");
            return;
        }
    }

    handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        this.setState({...this.state,[name]:value});
    }

    render(){
        console.log(this.context);
        const {displayName, email, password, confirmPassword } = this.state;
        return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit = {this.formSubmit}>
                <FormInput
                label="Display Name" 
                type = "text" 
                required 
                onChange={this.handleChange} 
                name="displayName" 
                value ={displayName} />

                <FormInput
                label="Email"
                type="email" 
                required onChange={this.handleChange} 
                name="email" 
                value={email}/>

                <FormInput
                label="Password"
                type="password" 
                required 
                onChange={this.handleChange} 
                name="password" 
                value={password}/>

                <FormInput
                label="Confirm Password"
                type="password" 
                required onChange={this.handleChange} 
                name="confirmPassword" 
                value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
        );
    }
}
export default withParams(SignUpForm,()=>({dispatch:useDispatch()}));