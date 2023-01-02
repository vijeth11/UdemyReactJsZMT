import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { UserProvider } from './context/user.context';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/cart.context';
import { CategoriesProvider } from './context/categories.context';
import { persistedStore, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stipe/stripe.utils';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate persistor={persistedStore}>
        <BrowserRouter>
        {/*<UserProvider>*/}
          <CategoriesProvider>
            {/*<CartProvider>*/}
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
            {/*</CartProvider>*/}
          </CategoriesProvider>
        {/*</UserProvider>*/}
        </BrowserRouter>
        </PersistGate>
    </Provider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
