import { GET_ROOMS } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type) {
        case GET_ROOMS:
            return  action.payload || false;

        default:
            return state;
    }
}