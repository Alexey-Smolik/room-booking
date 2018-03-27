import { HANDLE_MOUSE_EVENT } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type ) {
        
        case HANDLE_MOUSE_EVENT:
            return action.payload || false;

        default:
            return state;
    }
}