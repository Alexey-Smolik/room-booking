import {
  DELETE_EVENT,
  EDIT_EVENT,
  ADD_EVENT,
  GET_EVENTS
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload || false;

        case DELETE_EVENT:
            return state.filter( event =>
                event.id !== action.payload);

        case ADD_EVENT:
            let newState2 = state.filter( event =>
                event.id !== action.payload.id);
            console.log(newState2);
            return [...newState2, action.payload ];

        case EDIT_EVENT:
            let newState1 = state.filter( event =>
                event.id !== action.payload.id);
            console.log(newState1);
            return [...newState1, action.payload ];

        default:
          return state;
    }
}
