import {compose, createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { loggerMiddleware } from '../middleware/logger-middleware';
import { rootSaga } from './root-saga';
import { createLogger } from 'redux-logger';

// middlewares in store enhances the state by catching actions before 
// the reducer is called. It is used to log or modify store. 
// Multiple enhancers can be used as an array and composed into one 
// by using compose method and applyMiddlewares.

// store needs rootReducer which combines all the reducers.
// the action dispatched will trigger all the sub reducers present in 
// root reducers

//thunk is like effects in angular which is used to run async functions 
//like some http call and retrieve data then trigger an action which sets 
//data and updates the state. In this project it is not used yet only middleware is added
//refer course for more info
type ExtendedPersistConfig = PersistConfig<RootState> & {
    blacklist:(keyof RootState)[]
}

const persistConfig:ExtendedPersistConfig = {
    key:'root',
    storage,
    blacklist:['user'],
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

const middleWares = process.env.NODE_ENV === 'development'? [logger, loggerMiddleware,] : [];

// telling browser to use Redux Devtools if it exsits for looking at changes if not use regular compose 
const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//const composeEnhancer =  compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...[...middleWares,thunk, sagaMiddleware]));
//const composedEnhancers = composeWithDevTools(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

// persist store is used to retain the redux-store in the localStorage of browser
// so when user refreshes the browser still his data is retained and not lost 
// like checkout page which initially used to get removed from store on refresh browser
export const persistedStore = persistStore(store);