import axios from 'axios';
import { GET_ROOM, ADD_ROOM } from './types';

export const getRoom = () => async dispatch => {
    const res = await axios.get('/api/room');
    dispatch({ type: GET_ROOM, payload: res.data });
};    


export const addRoom = () => async dispatch => {
    const res = await axios.put('/api/add_room');
    dispatch({ type: ADD_ROOM, payload: res.data });
}
