import axios from 'axios';
import {
    GET_ALL_ISSUES,
    GET_ROOM_ISSUES,
    CREATE_ISSUE,
    DELETE_ISSUE,
    EDIT_ISSUE,
} from './types';

export const getAllIssues = () => async dispatch => {
    const res = await axios.get('/api/issues/');
    dispatch({type: GET_ALL_ISSUES, payload: res.data});
};
export const getRoomIssues = (roomID) => async dispatch => {
    const res = await axios.get(`/api/rooms/${roomID}/issues`);
    dispatch({type: GET_ROOM_ISSUES, payload: res.data});
};
export const updateIssue = (issueID, issueData) => async dispatch => {
     await axios.put(`/api/issues/${issueID}`, issueData);
    dispatch({type: EDIT_ISSUE, payload: issueData})
};
export const createIssue = (issueData) => async dispatch => {
    const res = await axios.post('/api/issues/', issueData);
    res.data.roomName = issueData.roomName;
    dispatch({type: CREATE_ISSUE, payload: res.data});
};
export const deleteIssue = (issueID) => async dispatch => {
    const res = await axios.delete(`/api/issues/${issueID}`);
    dispatch({type: DELETE_ISSUE, payload: res.data});
};