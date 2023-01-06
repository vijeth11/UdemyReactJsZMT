import { AnyAction } from "redux";
import { signInFailure, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from "./user.action";
import { UserData } from "./user.types";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading:Boolean;
    readonly error:Error | null;
}

const INITIAL_STATE:UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

// the user reducer which takes payload and modifies the state accordinto to 
// action type dispatched. We need to set the initial State for the reducer.
// this reducer is added in the root-reducer as with the key name as for which this 
// reducer is created in this example it is user

export const userReducer = (state = INITIAL_STATE, action: AnyAction):UserState => {
   
    if(signInSuccess.match(action)){
        return {...state, currentUser: action.payload};
    }
    if(signOutFailed.match(action)
    || signInFailure.match(action) 
    || signUpFailed.match(action)){
        return {...state, error:action.payload}
    }
    if(signOutSuccess.match(action)){
        return {...state, currentUser:null};
    }
    return state;
};

