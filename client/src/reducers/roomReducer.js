import { GET_ROOM , ADD_ROOM, GET_ROOMS, DELETE_ROOM, CREATE_ROOM, EDIT_ROOM } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type) {
        case GET_ROOM:
            return action.payload || false;

        case GET_ROOMS:
            return action.payload || false;

        case DELETE_ROOM:
            return action.payload || false;

        case CREATE_ROOM:
            return action.payload || false;

        case EDIT_ROOM:
            return action.payload || false;

        default:
            return state;
    }
}