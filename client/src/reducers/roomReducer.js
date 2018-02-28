import { GET_ROOM } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type) {
        case GET_ROOM:
            return action.payload || false;
        default:
            return state;
    }
    console.log("Room Reducers");
}