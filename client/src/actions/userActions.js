import axios from "axios/index";
import {
    GET_ALL_USERS,
    GET_CURRENT_USER,
    REMOVE_USER_FROM_STATE,
    DELETE_USER_DB,
    ADD_USER_DB,
    EDIT_USER_DB
} from "./types";

export const getCurrentUser = () => async (dispatch) => {
    const res = await axios.get('/api/users/current');
    dispatch({ type: GET_CURRENT_USER, payload: res.data });
};

export const userAuthForm = () => async (dispatch) => {
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




export const addUserDB = (user) => async (dispatch) => {
    const res = await axios.get('/api/users/');///////////////////////////////
    dispatch({ type: ADD_USER_DB, payload: user });
}

export const deleteUserDB = (userID) => async (dispatch) => {
    const res = await axios.get('/api/users/${userID}');///////////////////////////////
    dispatch({ type: DELETE_USER_DB, payload: userID });
}

export const editUserDB = (userID, user) => async (dispatch) => {
    const res = await axios.get('/api/users/${userID}');///////////////////////////////
    dispatch({ type: EDIT_USER_DB, payload: user });
}




