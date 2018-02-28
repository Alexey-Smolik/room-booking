import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

// var store = createStore(reducers, {}, applyMiddleware(reduxThunk));

render( 
    <Provider >
        <App /> 
    </Provider>,
     document.getElementById('app')
);