import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
};

// the user reducer which takes payload and modifies the state accordinto to 
// action type dispatched. We need to set the initial State for the reducer.
// this reducer is added in the root-reducer as with the key name as for which this 
// reducer is created in this example it is user

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {...state, currentUser: payload};
        default:
            return state
    }
};

