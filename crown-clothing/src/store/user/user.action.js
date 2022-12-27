import { createAction } from "../../utils/reducer/reducer.util";
import { USER_ACTION_TYPES } from "./user.types";

// function which is dispatched with payload and type to trigger 
// reducer based on Type
export const setCurrentUser  = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);