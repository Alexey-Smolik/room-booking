import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import eventReducer from './eventReducer';
import userReducer from './userReducer';
import officesReducer from './officesReducer';
import issuesReducer from './issuesReducer';
import imagesReducer from './imageReducer';
import modeReducer from './modeReducer';

export default combineReducers({
  rooms: roomReducer,
  events: eventReducer,
  user: userReducer,
  offices: officesReducer,
  issues: issuesReducer,
  images: imagesReducer,
  mode: modeReducer,
});
