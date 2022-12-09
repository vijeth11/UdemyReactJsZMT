import { Component } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";
import './authentication.style.scss';

class Authentication extends Component{
    
    // async logGoogleUser(){
    //     const {user} = await signInWithGooglePopup();
    //     console.log(user);
    //     createUserDocumentFromAuth(user);
    // }

    render(){
        return(
            <div className="authentication-container">
                {/* <button onClick={this.logGoogleUser}>Sign in with Google</button> */}
                {/* <button onClick={this.logGoogleUserRedirect}>Sign in with Google Redirect</button> */}
                <SignInForm/>
                <SignUpForm/>
            </div>);        
    }
}

export default Authentication;