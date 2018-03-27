import {
  GET_CURRENT_USER,
  GET_ALL_USERS,
  REMOVE_USER_FROM_STATE,
  USER_AUTH_FORM,
} from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload || false;

    case REMOVE_USER_FROM_STATE:
      return null || false;

    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    case USER_AUTH_FORM:
      console.log('reducer');
      return true;

    default:
      return state;
  }
}
