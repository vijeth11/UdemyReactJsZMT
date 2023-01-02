import { takeLatest, call, put, all} from "redux-saga/effects";
import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInUserWithEmailAndPassword, signInWithGoogleRedirect, signOutUser } from "../../utils/firebase/firebase.utils";
import { signInFailure, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapShorFromUserAuth(userAuth, additionalDetails){
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log(userSnapShot);
        console.log(userSnapShot.data());
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut(){
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInAfterSignUp({payload:{user, additionalDetails}}){
    try {
        yield call(getSnapShorFromUserAuth, user, additionalDetails)
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signUpWithEmail({payload:{email, password, displayName}}){
    try {
        const {user} = yield call(creatAuthUserWithEmailAndPassword,{email, password});
        yield put(signUpSuccess(user, {displayName}));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try {
        const {user} = yield call(signInUserWithEmailAndPassword, email, password);
        yield call(getSnapShorFromUserAuth,user);
    } catch (error) {
        yield put(signInFailure(error));
    }

}

export function* signInWithGoogle(){
    try{
        const {user} = yield call(signInWithGoogleRedirect);
        yield call(getSnapShorFromUserAuth, user);
    }catch(error)
    {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapShorFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSagas(){
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}