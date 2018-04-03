import {
    GET_ALL_ISSUES,
    GET_ROOM_ISSUES,
    DELETE_ISSUE,
    CREATE_ISSUE,
    EDIT_ISSUE,
} from '../actions/types';

export default function ( state = [], action) {

    switch( action.type) {
        case GET_ALL_ISSUES:
            return  action.payload;

        case GET_ROOM_ISSUES:
            return  action.payload;

        case CREATE_ISSUE:
            return [action.payload, ...state];

        case EDIT_ISSUE:
            return [action.payload, ...state.filter(({ id }) => id !== action.payload.id)];

        case DELETE_ISSUE:
            return  [...state.filter(({ id }) => id !== action.payload)];

        default:
            return state;
    }
}