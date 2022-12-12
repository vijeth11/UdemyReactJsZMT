import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListner } from "../utils/firebase/firebase.utils";

// as the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// provider is the component which handles the action
// it wraps around the children as an alias element and gives the children 
// ability to reach and use the data

// wrap the top level parent component from which you want all the sibling and children component
// have access to the data with this component <UserProvider> (check index.js) in the example
// note: only children and grand-children wrapped by this component will access to context other outer level component will not
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser}

    useEffect(() => {
        const unSubscribe  = onAuthStateChangedListner((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unSubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}