import { User, UserCredential } from "firebase/auth";
import { takeLatest, call, put, all} from "typed-redux-saga/macro";
import { 
    creatAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    getCurrentUser, 
    signInUserWithEmailAndPassword, 
    signInWithGoogleRedirect, 
    signOutUser } from "../../utils/firebase/firebase.utils";
import { 
    signInFailure, 
    signInSuccess, 
    signOutFailed, 
    signOutSuccess, 
    signUpFailed, 
    SignUpStart, 
    SignUpSuccess, 
    signUpSuccess, 
    EmailSignInStart } from "./user.action";
import { AdditionalInformation, USER_ACTION_TYPES } from "./user.types";

export function* getSnapShorFromUserAuth(userAuth:User, additionalDetails?:AdditionalInformation){
    try {
        const userSnapShot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if(userSnapShot){
            yield* put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
        }
    } catch (error) {
        yield* put(signInFailure(error as Error));
    }
}

export function* signOut(){
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* signInAfterSignUp({payload:{user, additionalDetails}}:SignUpSuccess){
    try {
        yield* call(getSnapShorFromUserAuth, user, additionalDetails)
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signUpWithEmail({payload:{email, password, displayName}}:SignUpStart){
    try {
        const userCredential = yield* call(creatAuthUserWithEmailAndPassword,{email, password});
        if(userCredential){
            const {user} = userCredential as UserCredential;
            yield* put(signUpSuccess(user, {displayName}));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signInWithEmail({payload: {email, password}}:EmailSignInStart){
    try {
        const userCredential = yield* call(signInUserWithEmailAndPassword, {email, password});
        if(userCredential){
            const { user }  = userCredential as UserCredential;
            yield* call(getSnapShorFromUserAuth,user);
        }
    } catch (error) {
        yield* put(signInFailure(error as Error));
    }

}

export function* signInWithGoogle(){
    try{
        const {user} = yield* call(signInWithGoogleRedirect);
        yield* call(getSnapShorFromUserAuth, user);
    }catch(error)
    {
        yield* put(signInFailure(error as Error));
    }
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getSnapShorFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailure(error as Error));
    }
}

export function* onSignOutStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSagas(){
    yield* all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}