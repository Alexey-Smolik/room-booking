import {
  DELETE_EVENT,
  EDIT_EVENT,
  CREATE_EVENT,
  GET_EVENTS
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {

        case DELETE_EVENT:
            return state.events.filter( event =>
                event.id !== action.payload.id);

      case CREATE_EVENT:
          let newState2 = state.events.filter( event =>
            event.id !== action.payload.id);
          console.log([...newState2, action.payload ]);
          return [...newState2, action.payload ];

    case EDIT_EVENT:
        console.log(action.payload );
        let newState1 = state.events.filter( event =>
            event.id !== action.payload.id);
        console.log([...newState1, action.payload ]);
        return [...newState1, action.payload ];

    case GET_EVENTS:
      return action.payload || false;

    default:
      return state;
  }
}
