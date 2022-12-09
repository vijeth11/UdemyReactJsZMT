import { Component } from "react";
import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

class SignUpForm extends Component{
    formInitialState = {
        displayName: '',
        email: '',
        password:'',
        confirmPassword:''
    };

    constructor(){
        super();
        this.state= {...this.formInitialState};
      }
    
    resetFormFields(){
        this.setState({...this.formInitialState});
    }

    formSubmit = async (event) =>{
        event.preventDefault();
        if(this.state.password == this.state.confirmPassword){      
            try{  
            let {user} =  await creatAuthUserWithEmailAndPassword({email:this.state.email, password:this.state.password});
            await createUserDocumentFromAuth(user,{displayName:this.state.displayName});
            this.resetFormFields();
            }catch(error){
                if(error.code == 'auth/email-already-in-use'){
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

    handleChange=(event)=>{
        const {name, value} = event.target;
        this.setState({...this.state,[name]:value});
        console.log(this.state);
    }

    render(){
        const {displayName, email, password, confirmPassword } = this.state;
        return (
        <div>
            <h1>Sign up with your email and password</h1>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
        );
    }
}

export default SignUpForm;