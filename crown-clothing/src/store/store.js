import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// middlewares in store enhances the state by catching actions before 
// the reducer is called. It is used to log or modify store. 
// Multiple enhancers can be used as an array and composed into one 
// by using compose method and applyMiddlewares.

// store needs rootReducer which combines all the reducers.
// the action dispatched will trigger all the sub reducers present in 
// root reducers

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
