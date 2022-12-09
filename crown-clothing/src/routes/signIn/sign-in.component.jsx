import { Component } from "react";
import { getRedirectResult } from 'firebase/auth';
import {auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils.js';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

class SignIn extends Component{
    
    // async logGoogleUser(){
    //     const {user} = await signInWithGooglePopup();
    //     console.log(user);
    //     createUserDocumentFromAuth(user);
    // }

    async logGoogleUserRedirect(){
        await signInWithGoogleRedirect();
    }

    async componentDidMount() {
        const response = await getRedirectResult(auth);
        if(response){
            createUserDocumentFromAuth(response.user);
        }
    }

    render(){
        return(
            <div>
            <h1>I am the signIn page</h1>
            {/* <button onClick={this.logGoogleUser}>Sign in with Google</button> */}
            <button onClick={this.logGoogleUserRedirect}>Sign in with Google Redirect</button>
            <SignUpForm/>
            </div>);        
    }
}

export default SignIn;