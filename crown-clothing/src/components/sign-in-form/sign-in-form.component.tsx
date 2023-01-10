import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { withParams } from "../../utils/util/withParams.util";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

type FormState = {
    email:string;
    password:string;
}

class SignInForm extends Component<{dispatch?:Dispatch<AnyAction>},FormState>{
    formInitialState = {
        email: '',
        password:'',
    };    
    
    constructor(){        
        super({});
        this.state= {...this.formInitialState};
      }

    resetFormFields(){
        this.setState({...this.formInitialState});
    }

    signInWithGoogle = async() => {
        if(this.props.dispatch){
            this.props.dispatch(googleSignInStart())
        }
    }

    // async componentDidMount() {
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         createUserDocumentFromAuth(response.user);
    //     }

    // }

    formSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try{
            if(this.props.dispatch){
                this.props.dispatch(emailSignInStart(this.state.email, this.state.password));
                this.resetFormFields();
            }
        }catch(error){
            switch((error as AuthError).code){
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('incorrect password for email');
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
        
    }

    handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        this.setState({...this.state,[name]:value});
    }

    render(){
        const {email, password} = this.state;
        return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit = {this.formSubmit}>                

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
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button 
                    type="button" 
                    buttonType = {BUTTON_TYPE_CLASSES.google} 
                    onClick = {this.signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
        );
    }
}

export default withParams(SignInForm, ()=>({dispatch: useDispatch()}));