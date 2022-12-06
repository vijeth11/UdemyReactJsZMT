import { Component } from "react";
import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils.js';

class SignIn extends Component{
    
    async logGoogleUser(){
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    render(){
        return(
            <div>
            <h1>I am the signIn page</h1>
            <button onClick={this.logGoogleUser}>Sign in with Google</button>
            </div>);        
    }
}

export default SignIn;