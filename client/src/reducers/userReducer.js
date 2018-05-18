import isEmpty from 'lodash.isempty'
import {
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_ERROR,
    GET_CURRENT_USER_LOADED,
    GET_ALL_USERS,
    REMOVE_USER_FROM_STATE,
    ADD_USER_DB,
    DELETE_USER_DB,
    EDIT_USER_DB,
    GET_MANAGERS,
    ADD_SIMPLE_USERS,
    SET_CURRENT_USER,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {

      case ADD_USER_DB:
          return { ...state, allUsers: [action.payload, ...state.allUsers]};


      case ADD_SIMPLE_USERS:{
          return { ...state, simpleUsers: action.payload};
      }

      case DELETE_USER_DB:
          return { ...state, allUsers: state.allUsers.filter(({ id }) => id !== action.payload)};

      case EDIT_USER_DB:
          return {...state, allUsers: state.allUsers.map((user) => {
              if(user.id !== action.payload.id) {
                  return user
              }
              return action.payload
          })};

      case GET_CURRENT_USER_LOADED:
        return { ...state, isLoaded: action.isLoaded, hasError: false };

      case GET_CURRENT_USER_ERROR:
          return { ...state, hasError: action.hasError };

      case GET_CURRENT_USER_SUCCESS:
          return { ...state, currentUser: action.user };

      case SET_CURRENT_USER: {
          return { ...state, isAuthenticated: !isEmpty(action.payload)};
      }
      case REMOVE_USER_FROM_STATE:
          return { ...state, currentUser: null, isLoaded: false, hasError: false  };

      case GET_ALL_USERS:
        return { ...state, allUsers: action.payload };


      case GET_MANAGERS:
          return { ...state, managers: action.payload };

      default:
        return state;
  }
}
