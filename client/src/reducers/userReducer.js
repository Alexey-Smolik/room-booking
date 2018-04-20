import {
    GET_CURRENT_USER,
    GET_ALL_USERS,
    REMOVE_USER_FROM_STATE,
    ADD_USER_DB,
    DELETE_USER_DB,
    EDIT_USER_DB,
    GET_MANAGERS,
    ADD_SIMPLE_USERS
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
          return { allUsers: [...state.allUsers.filter(({ id }) => id !== action.payload.id), action.payload], ...state};

      case GET_CURRENT_USER:
        return { ...state, currentUser: action.payload };

      case REMOVE_USER_FROM_STATE:
        return null || false;

      case GET_ALL_USERS:
        return { ...state, allUsers: action.payload };


      case GET_MANAGERS:
          return { ...state, managers: action.payload };

      default:
        return state;
  }
}
