import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
};

// the user reducer which takes payload and modifies the state accordinto to 
// action type dispatched. We need to set the initial State for the reducer.
// this reducer is added in the root-reducer as with the key name as for which this 
// reducer is created in this example it is user

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {...state, currentUser: payload};
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
            return {...state, error:payload}
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser:null};
        default:
            return state
    }
};

