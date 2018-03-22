import React from 'react';
import { render } from 'react-dom';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';



//import { composeWithDevTools } from 'redux-devtools-extension';
// const createStoreWithMiddleware =  composeWithDevTools(applyMiddleware(reduxThunk))(createStore);
// const store = createStoreWithMiddleware(reducers);

const store = createStore( reducers, {}, applyMiddleware(reduxThunk) );


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
registerServiceWorker();
