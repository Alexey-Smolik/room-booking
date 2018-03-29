import {
    GET_ALL_ISSUES,
    GET_ROOM_ISSUES,
    DELETE_ISSUE,
    CREATE_ISSUE,
} from '../actions/types';

export default function ( state = [], action) {

    switch( action.type) {
        case GET_ALL_ISSUES:
            return  action.payload || false;

        case GET_ROOM_ISSUES:
            return  action.payload || false;

        case CREATE_ISSUE:
            return [action.payload, ...state] || false;

        case DELETE_ISSUE:
            return  [...state.filter(({ id }) => id !== action.payload)] || false;
        default:
            return state;
    }
}