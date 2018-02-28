import axios from 'axios';
import { GET_ROOM } from './types';

export const getRoom = () => async dispatch => {
    const res = await axios.get('/api/room');
    dispatch({ type: GET_ROOM, payload: res.data });
};    

