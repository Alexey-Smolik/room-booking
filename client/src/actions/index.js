import axios from 'axios';
import { GET_ROOM, GET_ROOMS, DELETE_EVENT, EDIT_EVENT, CREATE_EVENT } from './types';


export const getRoom = (roomID) => async dispatch => {
    const res = await axios.get('/api/room/${roomID}');


export const getRoom = () => async dispatch => {
    const res = await axios.get('/api/rooms/:id');
    dispatch({ type: GET_ROOM, payload: res.data });
};

export const getRooms = () => async dispatch => {
    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ROOMS, payload: res.data });
};

export const deleteEvent = (eventID) => async dispatch => {
    const res = await axios.delete('/api/events/${eventID}');
    dispatch({ type: DELETE_EVENT, payload: res.data });
};

export const editEvent = (eventID, postData) => async dispatch => {
    const res = await axios.put('/api/events/${eventID}', postData);
    dispatch({ type: EDIT_EVENT, payload: res.data });
};


export const createEvent = (eventID, postData) => async dispatch => {
    const res = await axios.post('/api/events/${eventID}', postData);
    dispatch({ type: CREATE_EVENT, payload: res.data });
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
