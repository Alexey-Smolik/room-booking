import axios from 'axios';
import {
    GET_ALL_ISSUES,
    GET_ROOM_ISSUES,
    CREATE_ISSUE,
    DELETE_ISSUE,
} from './types';

export const getAllIssues = () => async dispatch => {
    const res = await axios.get('/api/issues/');
    dispatch({type: GET_ALL_ISSUES, payload: res.data});
};
export const getRoomIssues = (roomID) => async dispatch => {
    const res = await axios.get(`/api/rooms/${roomID}/issues`);
    dispatch({type: GET_ROOM_ISSUES, payload: res.data});
};
export const updateIssue = (issueID, roomID, issueData) => async dispatch => {
    await axios.put(`/api/issues/${issueID}`, issueData);
    roomID ?  dispatch(getRoomIssues(roomID)):  dispatch(getAllIssues());
};
export const createIssue = (issueData) => async dispatch => {
    const res = await axios.post('/api/issues/', issueData);
    dispatch({type: CREATE_ISSUE, payload: res.data});
};
export const deleteIssue = (issueID) => async dispatch => {
    const res = await axios.delete(`/api/issues/${issueID}`);
    dispatch({type: DELETE_ISSUE, payload: res.data});
};

