// function which recieves current state and from that state we 
// can retriev the required property the method is passed to 
// useSelector hook in Navigation Component

export const selectCurrentUser = (state) => state.user.currentUser;