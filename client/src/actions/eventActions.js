import axios from "axios/index";
import {
    ADD_EVENT,
    DELETE_EVENT,
    EDIT_EVENT,
    GET_EVENTS
} from "./types";

export const getEvents = roomID => async (dispatch) => {
    const res = await axios.get(`/api/rooms/${roomID}/events`);
    dispatch({ type: GET_EVENTS, payload: res.data });
};

export const createEvent = newEvent => async (dispatch) => {
    const res = await axios.post('/api/events', newEvent);
    if (res.status === 201) {
        dispatch({ type: ADD_EVENT, payload: res.data });
    } else {
        console.log('createEvent -> Error message:', res.body);
    }
};

export const deleteEvent = eventID => async (dispatch) => {
    const res = await axios.delete(`/api/events/${eventID}`);
    dispatch({ type: DELETE_EVENT, payload: eventID });
};
export const editEvent = (eventID, editedEvent) => async (dispatch) => {
    const res = await axios.put(`/api/events/${eventID}`, editedEvent);
    dispatch({ type: EDIT_EVENT, payload: editedEvent });
};
