import {
  GET_ALL_OFFICES,
  GET_OFFICE,
  CREATE_OFFICE,
  DELETE_OFFICE,
  EDIT_OFFICE,
} from '../actions/types';

export default function (state = [], action) {

  switch (action.type) {
    case GET_ALL_OFFICES:
      return action.payload;

    case GET_OFFICE:
      return action.payload;

    case CREATE_OFFICE:
      return [action.payload, ...state];

    case EDIT_OFFICE:
        state.map((issue,index) => {(issue.id === action.payload.id) ? state[index] = action.payload: null});
        return state;

      case DELETE_OFFICE:
      return [...state.filter(({ id }) => id !== action.payload)];

    default:
      return state;
  }
}
