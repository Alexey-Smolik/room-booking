import axios from 'axios';
import {
    GET_ROOM_IMAGES,
    ADD_ROOM_IMAGE,
    DELETE_ROOM_IMAGE,
} from './types';


export const getRoomImages = (roomID) => async dispatch => {
    const res = await axios.get(`/api/rooms/${roomID}/images`);
    dispatch({type: GET_ROOM_IMAGES, payload: res.data});
};
export const addRoomImage = (roomImage, roomID) => async dispatch => {
    const res = await axios.post(`/api/rooms/${roomID}/images`, roomImage);
    dispatch({type: ADD_ROOM_IMAGE, payload: res.data});
};
export const deleteRoomImage = (imageID) => async dispatch => {
    const res = await axios.delete(`/api/rooms/images/${imageID}`);
    dispatch({type: DELETE_ROOM_IMAGE, payload: res.data});
};

