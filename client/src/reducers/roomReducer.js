import { GET_ROOM , ADD_ROOM } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type) {
        case GET_ROOM:
            return action.payload || false;

        case ADD_ROOM:
            return action.payload || false;

        default:
            return state;
    }
}