import {
    GET_ISSUES,
    CREATE_ISSUE,
    EDIT_ISSUE,
    DELETE_ISSUE    
} from '../actions/types';

export default function ( state = [], action) {
	switch(action.type) {
        case GET_ISSUES:
            return  action.payload || false;

        case CREATE_ISSUE:
            return [action.payload, ...state] || false;

        case EDIT_ISSUE:
            return  action.payload || false;

        case DELETE_ISSUE:
            return  [...state.filter(({ id }) => id !== action.payload)] || false;

        default:
            return state;
    }
}