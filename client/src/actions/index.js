import axios from 'axios';
import {GET_ROOM, ADD_ROOM, DELETE_ROOM, EDIT_ROOM, CREATE_ROOM, GET_ROOMS} from './types';

export const getRoom = () => async dispatch => {
    const res = await axios.get('/api/rooms/:id');
    dispatch({ type: GET_ROOM, payload: res.data });
};

export const getRooms = () => async dispatch => {
    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ROOMS, payload: res.data });
};

export const createRoom = () => async dispatch => {
    const res = await axios.post('/api/rooms');
    dispatch({ type: CREATE_ROOM, payload: res.data });
};

export const editRoom = () => async dispatch => {
    const res = await axios.put('/api/rooms/:id');
    dispatch({ type: EDIT_ROOM, payload: res.data });
};

export const deleteRoom = () => async dispatch => {
    const res = await axios.delete('/api/rooms/:id');
    dispatch({ type: DELETE_ROOM, payload: res.data });
};