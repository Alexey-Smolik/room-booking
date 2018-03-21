import axios from 'axios';
import {
    GET_ROOM,
    GET_ALL_ROOMS,
    DELETE_ROOM,
    CREATE_ROOM,
    DELETE_EVENT,
    EDIT_EVENT,
    CREATE_EVENT,
    GET_EVENTS,
    GET_CURRENT_USER,
    GET_ALL_USERS,
    GET_COMPANY,
    GET_ALL_COMPANIES,
    CREATE_COMPANY,
    DELETE_COMPANY,
} from './types';

export const getRoom = (roomID) => async dispatch => {
    const res = await axios.get(`/api/rooms/${roomID}`);
    dispatch({ type: GET_ROOM, payload: res.data });
};
export const getRooms = () => async dispatch => {
    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ALL_ROOMS, payload: res.data });
};
export const createRoom = (roomData) => async dispatch => {
    const res = await axios.post('/api/rooms/', roomData);
    dispatch({ type: CREATE_ROOM, payload: res.data });
};
export const updateRoom = (roomData) => async dispatch => {
    await axios.put('/api/rooms', roomData);
    dispatch(getRooms());
};
export const deleteRoom = (roomID) => async dispatch => {
    const res = await axios.delete(`/api/rooms/${roomID}`, );
    dispatch({ type: DELETE_ROOM, payload: res.data });
};

export const getCompany = (companyID) => async dispatch => {
    const res = await axios.get(`/api/companies/${companyID}`);
    dispatch({ type: GET_COMPANY, payload: res.data });
};
export const getCompanies = () => async dispatch => {
    const res = await axios.get('/api/companies');
    dispatch({ type: GET_ALL_COMPANIES, payload: res.data });
};
export const createCompany = (companyData) => async dispatch => {
    const res = await axios.post('/api/companies/', companyData);
    dispatch({ type: CREATE_COMPANY, payload: res.data });
};
export const updateCompany = (companyData) => async dispatch => {
    await axios.put('/api/companies', companyData);
    dispatch(getCompanies());
};
export const deleteCompany = (companyID) => async dispatch => {
    const res = await axios.delete(`/api/companies/${companyID}`, );
    dispatch({ type: DELETE_COMPANY, payload: res.data });
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
export const getAllUsers = () => async dispatch => {
    const res = await axios.get('/api/users/');
    console.log("Action -> get all users");
    dispatch({ type: GET_ALL_USERS, payload: res.data });
};


// export const filterDate = (date_from, date_to) => async dispatch => {
//     const res = await axios.post('/api/events', date_from, date_to);
//     dispatch({ type: FILTER_ROOM, payload: res.data });
//
// };

