import { combineReducers } from 'redux';
import roomsList from './roomReducer';
import roomEvents from './eventReducer';
import userReducer from './userReducer';
import companiesReducer from './companiesReducer';

export default combineReducers({
  rooms: roomsList,
  events: roomEvents,
  user: userReducer,
  companies: companiesReducer,
});
