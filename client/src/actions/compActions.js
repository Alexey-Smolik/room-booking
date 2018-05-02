import axios from "axios/index";
import {
    CREATE_COMPANY,
    DELETE_COMPANY,
    GET_ALL_COMPANIES,
    GET_COMPANY,
    EDIT_COMPANY,
} from "./types";

export const getCompany = companyID => async (dispatch) => {
    const res = await axios.get(`/api/offices/${companyID}`);
    dispatch({ type: GET_COMPANY, payload: res.data });
};
export const getCompanies = () => async (dispatch) => {
    const res = await axios.get('/api/offices');
    dispatch({ type: GET_ALL_COMPANIES, payload: res.data });
};
export const createCompany = companyData => async (dispatch) => {
    const res = await axios.post('/api/offices/', companyData);
    dispatch({ type: CREATE_COMPANY, payload: res.data });
};
export const updateCompany = (companyData, id) => async (dispatch) => {
    await axios.put(`/api/offices/${id}`, companyData);
    dispatch({type: EDIT_COMPANY, payload: companyData});
};
export const deleteCompany = companyID => async (dispatch) => {
    const res = await axios.delete(`/api/offices/${companyID}`);
    dispatch({ type: DELETE_COMPANY, payload: res.data });
};