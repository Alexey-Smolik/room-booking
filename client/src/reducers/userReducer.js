import { GET_CURRENT_USER } from '../actions/types';

export default function ( state = null, action) {

    switch( action.type) {
        case GET_CURRENT_USER:
            console.log("Reducer -> current-user");
            return  action.payload || false;

        default:
            return state;
    }
}