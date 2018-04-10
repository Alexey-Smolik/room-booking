import {
    GET_ALL_ROOMS,
    GET_ROOMS_BY_DATE,
    DELETE_ROOM,
    CREATE_ROOM,
    EDIT_ROOM,
    GET_ROOM,
    ADD_ROOM_TO_STATE,
    DELETE_ROOM_FROM_STATE,
    EDIT_ROOM_IN_STATE,
    FILTER_PM
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {

    case GET_ROOM:
      return action.payload || false;

    case GET_ALL_ROOMS:
      return action.payload || false;

    case GET_ROOMS_BY_DATE:
      return action.payload || false;

    case CREATE_ROOM:
      return [action.payload, ...state] || false;

    case EDIT_ROOM:
        state.map((issue,index) => {(issue.id === action.payload.id) ? state[index] = action.payload: null});
        return state;

      case DELETE_ROOM:
      return [...state.filter(({ id }) => id !== action.payload)] || false;


      ////////////////////////////////////////////////////////////////////////////

    case ADD_ROOM_TO_STATE:
        console.log(action.payload);
        return [ ...state, action.payload] || false;

    case DELETE_ROOM_FROM_STATE :
        return [...state.filter( (index) =>  index.id !== action.payload)];

    case EDIT_ROOM_IN_STATE:
        return [...state.filter((index) => index.id !== action.payload.id), action.payload] || false;

      case FILTER_PM:
      return [...action.payload] || false;

    default:
        return state;
  }
}
