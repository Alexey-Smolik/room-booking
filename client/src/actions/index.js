import axios from 'axios';
import { GET_ROOM, GET_ROOMS, DELETE_EVENT, FILTER_ROOM,
    EDIT_EVENT, CREATE_EVENT , GET_EVENTS, GET_CURRENT_USER} from './types';

export const getRoom = (roomID) => async dispatch => {
    const res = await axios.get('/api/rooms', roomID);
    dispatch({ type: GET_ROOM, payload: res.data });
};

export const getRooms = () => async dispatch => {
    const res = await axios.get('/api/rooms');
    console.log("Action -> getrooms");
    dispatch({ type: GET_ROOMS, payload: res.data });
};

export const getEvents = (roomID) => async dispatch => {
    const res = await axios.get('/api/rooms/'+roomID);
    console.log("Action -> getEvents");
    dispatch({ type: GET_EVENTS, payload: res.data });
};



export const deleteEvent = (eventID) => async dispatch => {
    const res = await axios.delete('/api/events/' + eventID);
    dispatch({ type: DELETE_EVENT, payload: res.data });
};

export const editEvent = (eventID, editedEvent) => async dispatch => {
    const res = await axios.put('/api/events/' + eventID, editedEvent );
    dispatch({ type: EDIT_EVENT, payload: res.data });
};

export const createEvent = (newEvent) => async dispatch => {
    const res = await axios.post('/api/events', newEvent);
    if(res.status === 200)
        dispatch({ type: CREATE_EVENT, payload: res.data });
    else
        console.log("createEvent -> Error message:" , res.body);
};

export const getCurrentUser = () => async dispatch => {
    const res = await axios.get('/api/users/current');
    console.log("Action -> get Current user");
    dispatch({ type: GET_CURRENT_USER, payload: res.data });
};




// export const filterDate = (date_from, date_to) => async dispatch => {
//     const res = await axios.post('/api/events', date_from, date_to);
//     dispatch({ type: FILTER_ROOM, payload: res.data });
//
// };

