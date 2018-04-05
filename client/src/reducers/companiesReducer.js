import {
  GET_ALL_COMPANIES,
  GET_COMPANY,
  CREATE_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY,
} from '../actions/types';

export default function (state = [], action) {

  switch (action.type) {
    case GET_ALL_COMPANIES:
      return action.payload;

    case GET_COMPANY:
      return action.payload;

    case CREATE_COMPANY:
      return [action.payload, ...state];

    case EDIT_COMPANY:
        state.map((issue,index) => {(issue.id === action.payload.id) ? state[index] = action.payload: null});
        return state;

      case DELETE_COMPANY:
      return [...state.filter(({ id }) => id !== action.payload)];

    default:
      return state;
  }
}
