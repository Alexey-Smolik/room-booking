import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import eventReducer from './eventReducer';
import userReducer from './userReducer';
import companiesReducer from './companiesReducer';
import issuesReducer from './issuesReducer';
import imagesReducer from './imageReducer';

export default combineReducers({
  rooms: roomReducer,
  events: eventReducer,
  user: userReducer,
  companies: companiesReducer,
  issues: issuesReducer,
  images: imagesReducer,

});
