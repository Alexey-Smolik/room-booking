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
            return [...state.filter( event =>  event.id != action.payload)];

        case ADD_EVENT:
            if( action.payload.newEvent.roomId == action.payload.roomId)
            {
                return [...state.filter(event => event.id !== action.payload.newEvent.id), action.payload.newEvent];
            } else {
                return [...state];
            }

        case EDIT_EVENT:
            if( action.payload.newEvent.roomId == action.payload.roomId)
            {
                return [...state.filter(event => event.id !== action.payload.newEvent.id), action.payload.newEvent];
            } else {
                return [...state];
            }

        default:
          return state;
    }
}
