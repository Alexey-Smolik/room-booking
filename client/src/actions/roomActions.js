import axios from "axios/index";
import {
    CREATE_ROOM,
    DELETE_ROOM,
    GET_ALL_ROOMS,
    GET_ROOMS_BY_DATE,
    ADD_ROOM_TO_STATE,
    DELETE_ROOM_FROM_STATE,
    EDIT_ROOM_IN_STATE
} from "./types";

export const getRooms = () => async (dispatch) => {
    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ALL_ROOMS, payload: res.data });
};
export const getRoomsByDate = (start_date, end_date) => async (dispatch) => {
    const res = await axios.get(`/api/rooms?startDate=${start_date}&endDate=${end_date}`);
    dispatch({ type: GET_ROOMS_BY_DATE, payload: res.data });
};

export const createRoom = roomData => async (dispatch) => {
    const res = await axios.post('/api/rooms/', roomData);
    dispatch({ type: CREATE_ROOM, payload: res.data });
};

export const updateRoom = (roomData, id) => async (dispatch) => {
    await axios.put(`/api/rooms/${id}`, roomData);
    dispatch(getRooms());
};

export const deleteRoom = roomID => async (dispatch) => {
    const res = await axios.delete(`/api/rooms/${roomID}`);
    dispatch({ type: DELETE_ROOM, payload: res.data });
};



export const addRoomToState = roomData => async ( dispatch) => {
    dispatch({ type: ADD_ROOM_TO_STATE, payload: roomData})
}

export const editRoomInState = roomData => async ( dispatch) => {
    dispatch({ type: EDIT_ROOM_IN_STATE, payload: roomData})
}

export const deleteRoomFromState = roomId => async ( dispatch) => {
    dispatch({ type: DELETE_ROOM_FROM_STATE, payload: roomId})
}

