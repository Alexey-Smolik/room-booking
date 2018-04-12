import {
    ADD_PM_ID,
    ADD_ROOM_ID,
    CHANGE_MODE
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {

        case ADD_PM_ID:
            return { ...state, pmId: action.payload } || false;

        case ADD_ROOM_ID:
            return { ...state,roomId: action.payload }  || false;

        case CHANGE_MODE:
            return { ...state, mode: action.payload } || false ;

        default:
            return state;
    }
}
