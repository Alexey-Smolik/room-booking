import {
    ADD_PM_ID,
    ADD_ROOM_ID,
    CHANGE_MODE
} from '../actions/types';


export const addPMId = ( pmId ) => async (dispatch) => {
    dispatch({type: ADD_PM_ID, payload: pmId});
};

export const addRoomId = (roomID) => async (dispatch) => {
    dispatch({type: ADD_ROOM_ID, payload: roomID});
};


export const changeMode = ( mode ) => async (dispatch) => {
    dispatch({type: CHANGE_MODE, payload: mode});
};

