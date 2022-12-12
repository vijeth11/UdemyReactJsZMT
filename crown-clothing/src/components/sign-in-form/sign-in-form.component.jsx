import { Component } from "react";
import { signInUserWithEmailAndPassword, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

class SignInForm extends Component{
    formInitialState = {
        email: '',
        password:'',
    };    
    
    constructor(){
        super();
        this.state= {...this.formInitialState};
      }

    resetFormFields(){
        this.setState({...this.formInitialState});
    }

    async signInWithGoogle(){
        await signInWithGoogleRedirect();
    }

    // async componentDidMount() {
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         createUserDocumentFromAuth(response.user);
    //     }

    // }

    formSubmit = async (event) =>{
        event.preventDefault();
        try{
            const {user} = await signInUserWithEmailAndPassword({email:this.state.email, password:this.state.password});
            this.resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
        
    }

    handleChange=(event)=>{
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
                    buttonType = "google" 
                    onClick = {this.signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
        );
    }
}

export default SignInForm;