// function which recieves current state and from that state we 
// can retriev the required property the method is passed to 
// useSelector hook in Navigation Component

import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUser = (state:RootState):UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUser,
    (user) => user.currentUser
);