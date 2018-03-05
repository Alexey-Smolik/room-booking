import { GET_ROOM, DELETE_EVENT, EDIT_EVENT, CREATE_EVENT, GET_EVENTS } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type) {
        case GET_ROOM:
            return action.payload || false;

        case DELETE_EVENT:
            return action.payload || false;

        case CREATE_EVENT:
            return action.payload || false;

        case EDIT_EVENT:
            return action.payload || false;

        case GET_EVENTS:
            return action.payload || false;

        default:
            return state;
    }
}