import {combineReducers} from 'redux';
import roomsList  from './roomsList';
import roomEvents  from './roomEvents';

export default combineReducers({
    rooms: roomsList,
    events: roomEvents
});