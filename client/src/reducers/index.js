import {combineReducers} from 'redux';
import roomsList  from './roomsList';
import roomEvents  from './roomEvents';
import userReducer  from './userReducer';
import companiesReducer from './companies';
import issues from './issues';
import mouseEvents from './mouseEvents';

export default combineReducers({
    rooms: roomsList,
    events: roomEvents,
    user: userReducer,
    companies: companiesReducer,
    issues: issues,
    mouseEvents: mouseEvents
});