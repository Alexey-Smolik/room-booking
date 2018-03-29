import {
    GET_ROOM_IMAGES,
    ADD_ROOM_IMAGE,
    DELETE_ROOM_IMAGE,
} from '../actions/types';

export default function ( state = [], action) {

    switch( action.type) {
        case GET_ROOM_IMAGES:
            return  action.payload || false;

        case ADD_ROOM_IMAGE:
            return [action.payload, ...state] || false;

        case DELETE_ROOM_IMAGE:
            return  [...state.filter(({ id }) => id !== action.payload)] || false;
        default:
            return state;
    }
}