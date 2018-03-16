import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';


const createStoreWithMiddleware =  composeWithDevTools(applyMiddleware(reduxThunk))(createStore);
const store = createStoreWithMiddleware(reducers);
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
registerServiceWorker();
