import axios from "axios/index";
import {
    GET_ALL_USERS,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_ERROR,
    GET_CURRENT_USER_LOADED,
    REMOVE_USER_FROM_STATE,
    DELETE_USER_DB,
    ADD_USER_DB,
    EDIT_USER_DB,
    GET_MANAGERS,
    ADD_SIMPLE_USERS,
    SET_CURRENT_USER,
} from "./types";
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }

}

export  const getCurrentUserHasError = (bool) => {
    return {
        type: GET_CURRENT_USER_ERROR,
        hasError: bool
    }
};
export  const getCurrentUserIsLoaded = (bool) => {
    return {
        type: GET_CURRENT_USER_LOADED,
        isLoaded: bool
    }
};
export  const getCurrentUserSuccess = (user) => {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        user
    }
};
export const getCurrentUser = () => async (dispatch) => {
    dispatch(getCurrentUserIsLoaded(false));
    try {
        const res = await axios.get('/api/users/current');
        dispatch(getCurrentUserSuccess(res.data));
        dispatch( getCurrentUserIsLoaded(true));
    } catch (e) {
        dispatch(getCurrentUserHasError(true))
    }
};

export const deleteCurrentUser = () => async (dispatch) => {
    dispatch({ type: REMOVE_USER_FROM_STATE});
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
};

export const getAllUsers = () => async (dispatch) => {
    const res = await axios.get('/api/users');
    dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const getManagers = () => async (dispatch) => {
    const res = await axios.get('/api/users/?role=2');
    dispatch({ type: GET_MANAGERS, payload: res.data });
};


export const simpleUsers = () => async (dispatch) => {
    const res = await axios.get(`/api/users?role=2`);
    dispatch({ type: ADD_SIMPLE_USERS, payload: res.data });
};


export const addUserDB = (user) => async (dispatch) => {
    const res = await axios.post(`/api/users/`, user);
    dispatch({ type: ADD_USER_DB, payload: res.data });
};

export const deleteUserDB = (userID) => async (dispatch) => {
    const res = await axios.delete(`/api/users/${userID}`);
    dispatch({ type: DELETE_USER_DB, payload: res.data });
};

export const editUserDB = (userID, user) => async (dispatch) => {
   const res =  await axios.put(`/api/users/${userID}`, user);
    dispatch({type: EDIT_USER_DB, payload: res.data})
};




