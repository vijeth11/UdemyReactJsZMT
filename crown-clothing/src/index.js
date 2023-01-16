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
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const  client = new ApolloClient({
  uri: 'https://crwn-clothing.com/',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client = {client}>
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
    </ApolloProvider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ApolloProvider is used to connect to the GraphQL server it requires client 
// client contains the end point URL and cache for caching data if there is no 
// change. GraphQL has single endpoint URL with multiple query types defined by the backend
// it is called as schema. When creating a query we need to refer the Schema to know collection name
// then define blueprint of the data inside collection by naming properties which all are required
// refering to schema