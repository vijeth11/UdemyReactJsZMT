import {all, call} from 'redux-saga/effects';
import { userSagas } from './user/user.saga';


// Redux saga is another middleware which gets triggered after reducers 
// have modified the state and it then does some business logics on the 
// new state value and dispatch an action which again goes through the 
// middlewares and trigger the reducers. This cycle repeats again if 
// any saga has something to update  

export function* rootSaga(){
    yield all([call(userSagas)]);
}