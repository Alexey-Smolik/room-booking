import {combineReducers} from 'redux';
import roomsList  from './roomsList';
import roomEvents  from './roomEvents';
import userReducer  from './userReducer';

export default combineReducers({
    rooms: roomsList,
    events: roomEvents,
    user: userReducer
});