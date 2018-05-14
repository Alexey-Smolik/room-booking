import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import setAuthorizationToken from "./utils/setAuthorizationToken";

import { composeWithDevTools } from 'redux-devtools-extension';
import {setCurrentUser} from "./actions/userActions";
import jwt from 'jsonwebtoken';
import {getCurrentUser} from "./actions";
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(reduxThunk))(createStore);
const store = createStoreWithMiddleware(reducers);

if(localStorage.token) {
    setAuthorizationToken(localStorage.token);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
    store.dispatch(getCurrentUser)
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
registerServiceWorker();
