import axios from 'axios';
import {
    GET_ROOM,
    GET_ALL_ROOMS,
    GET_ROOMS_BY_DATE,
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
    CREATE_ISSUE,
    GET_ISSUES,
    EDIT_ISSUE,
    DELETE_ISSUE,
    HANDLE_MOUSE_EVENT,
    REMOVE_USER_FROM_STATE,
    USER_AUTH_FORM,
} from './types';

export const getRoom = roomID => async (dispatch) => {
  const res = await axios.get(`/api/rooms/${roomID}`);
  dispatch({ type: GET_ROOM, payload: res.data });
};
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

export const getCompany = companyID => async (dispatch) => {
  const res = await axios.get(`/api/companies/${companyID}`);
  dispatch({ type: GET_COMPANY, payload: res.data });
};
export const getCompanies = () => async (dispatch) => {
  const res = await axios.get('/api/companies');
  dispatch({ type: GET_ALL_COMPANIES, payload: res.data });
};
export const createCompany = companyData => async (dispatch) => {
  const res = await axios.post('/api/companies/', companyData);
  dispatch({ type: CREATE_COMPANY, payload: res.data });
};
export const updateCompany = (companyData, id) => async (dispatch) => {
  await axios.put(`/api/companies/${id}`, companyData);
  dispatch(getCompanies());
};
export const deleteCompany = companyID => async (dispatch) => {
  const res = await axios.delete(`/api/companies/${companyID}`);
  dispatch({ type: DELETE_COMPANY, payload: res.data });
};

export const getEvents = roomID => async (dispatch) => {
  const res = await axios.get(`/api/rooms/${roomID}`);
  dispatch({ type: GET_EVENTS, payload: res.data });
};
export const deleteEvent = eventID => async (dispatch) => {
  const res = await axios.delete(`/api/events/${eventID}`);
  dispatch({ type: DELETE_EVENT, payload: res.data });
};
export const editEvent = (eventID, editedEvent) => async (dispatch) => {
  const res = await axios.put(`/api/events/${eventID}`, editedEvent);
  dispatch({ type: EDIT_EVENT, payload: res.data });
};
export const createEvent = newEvent => async (dispatch) => {
  const res = await axios.post('/api/events', newEvent);
  if (res.status === 200) { dispatch({ type: CREATE_EVENT, payload: res.data }); } else { console.log('createEvent -> Error message:', res.body); }
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await axios.get('/api/users/current');
  console.log('Current user', res);
  dispatch({ type: GET_CURRENT_USER, payload: res.data });
};

export const userAuthForm = () => async (dispatch) => {
  // console.log(userName, userPassword);
  const res = await axios.post('/auth/local');
  dispatch(getCurrentUser());
};

export const deleteCurrentUser = () => async (dispatch) => {
  const res = await axios.get('/auth/logout');
  dispatch({ type: REMOVE_USER_FROM_STATE, payload: res.data });
};


export const getAllUsers = () => async (dispatch) => {
  const res = await axios.get('/api/users/');
  dispatch({ type: GET_ALL_USERS, payload: res.data });
};



export const getIssues = (issueID) => async dispatch => {
    console.log('Getting Issues');
    const res = await axios.get('/api/issues/' + issueID);
    console.log(res.data);
    dispatch({ type: GET_ISSUES, payload: res.data });
};
export const createIssue = (newIssue) => async dispatch => {
    console.log('createIssue : ', newIssue);
    // const res = await axios.post('/api/issues', newIssue);
    // if(res.status === 200)
    //     dispatch({ type: CREATE_ISSUE, payload: res.data });
    // else
        // console.log("createIssue -> Error message:" , res.body);
};
export const editIssue = (issueID, editedIssue) => async dispatch => {
    console.log('Editing issues, ID :', issueID, 'Body : ', editedIssue);
    const res = await axios.put('/api/issues/' + issueID, editedIssue);
    dispatch({ type: EDIT_ISSUE, payload: res.data });
};
export const deleteIssue = (issueID) => async dispatch => {
    console.log('Delete Issue: ', issueID);
    // const res = await axios.delete('/api/issues/' + issueID);
    // dispatch({ type: DELETE_ISSUE, payload: res.data });
};


export const handleMouseEvent = (event) => async dispatch => {
    dispatch({ type: HANDLE_MOUSE_EVENT, payload: event })
}