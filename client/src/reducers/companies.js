import {
    GET_ALL_COMPANIES,
    GET_COMPANY,
    CREATE_COMPANY,
    DELETE_COMPANY,
} from '../actions/types';

export default function ( state = [], action) {

    switch( action.type) {
        case GET_ALL_COMPANIES:
            return  action.payload || false;

        case GET_COMPANY:
            return  action.payload || false;

        case CREATE_COMPANY:
            return [...state, action.payload] || false;

        case DELETE_COMPANY:
            return  [...state.filter(({ id }) => id !== action.payload.id)] || false;

        default:
            return state;
    }
}