import axios from "axios/index";
import {
    CREATE_OFFICE,
    DELETE_OFFICE,
    GET_ALL_OFFICES,
    GET_OFFICE,
    EDIT_OFFICE,
} from "./types";

export const getOffice = officeID => async (dispatch) => {
    const res = await axios.get(`/api/offices/${officeID}`);
    dispatch({ type: GET_OFFICE, payload: res.data });
};
export const getOffices = () => async (dispatch) => {
    const res = await axios.get('/api/offices');
    dispatch({ type: GET_ALL_OFFICES, payload: res.data });
};
export const createOffice = officeData => async (dispatch) => {
    const res = await axios.post('/api/offices/', officeData);
    dispatch({ type: CREATE_OFFICE, payload: res.data });
};
export const updateOffice = (officeData, id) => async (dispatch) => {
    await axios.put(`/api/offices/${id}`, officeData);
    dispatch({type: EDIT_OFFICE, payload: officeData});
};
export const deleteOffice = officeID => async (dispatch) => {
    const res = await axios.delete(`/api/offices/${officeID}`);
    dispatch({ type: DELETE_OFFICE, payload: res.data });
};