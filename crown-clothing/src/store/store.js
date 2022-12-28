import {compose, createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// middlewares in store enhances the state by catching actions before 
// the reducer is called. It is used to log or modify store. 
// Multiple enhancers can be used as an array and composed into one 
// by using compose method and applyMiddlewares.

// store needs rootReducer which combines all the reducers.
// the action dispatched will trigger all the sub reducers present in 
// root reducers

// custom middleware (here middleware are curry functions)
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    next(action);

    console.log('next state', store.getState());
}

const persistConfig = {
    key:'root',
    storage,
    blacklist:['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = process.env.NODE_ENV === 'development'? [logger, loggerMiddleware] : [];

// telling browser to use Redux Devtools if it exsits for looking at changes if not use regular compose 
const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

// persist store is used to retain the redux-store in the localStorage of browser
// so when user refreshes the browser still his data is retained and not lost 
// like checkout page which initially used to get removed from store on refresh browser
export const persistedStore = persistStore(store);