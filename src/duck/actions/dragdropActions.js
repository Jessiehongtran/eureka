import axios from 'axios';
import { API_URL } from '../../apiConfig';
export const GET_HEADER_SUCCESS = 'GET_HEADER_SUCCESS';
export const GET_HEADER_FAILURE = 'GET_HEADER_FAILURE';
export const ADD_HEADER_SUCCESS = 'ADD_HEADER_SUCCESS';
export const ADD_HEADER_FAILURE = 'ADD_HEADER_FAILURE';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export const UPDATE_HEADER_FAILURE = 'UPDATE_HEADER_FAILURE';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';
export const CHANGE_HEADER = 'CHANGE_HEADER';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const getHeader = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/text/session/${sessionID}`)
            dispatch({
                type: GET_HEADER_SUCCESS,
                payload: res.data[0]
            })
        } catch (err){
            dispatch({
                type: GET_HEADER_FAILURE,
                payload: err
            })
        }
    }
}

export const addHeader = (newHeader) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/text`, newHeader)
            console.log('res in posting header', res.data)
            dispatch({
                type: ADD_HEADER_SUCCESS,
                payload: res.data
            })
        } catch (err){
            dispatch({
                type: ADD_HEADER_FAILURE,
                payload: err
            })
        }
    }
}

export const updateHeader = (change, headerID) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/text/${headerID}`, change)
            console.log('res in updating header', res.data)
        } catch (err){
            dispatch({
                type: UPDATE_HEADER_FAILURE,
                payload: err
            })
        }
    }
}

export const changeHeader = (headerToChange) => {
    console.log('changing header')
    return {
        type: CHANGE_HEADER,
        payload: headerToChange
    }
}
 
export const getCategory = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/category/session/${sessionID}`)
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: res.data
            })
        } catch (err){
            dispatch({
                type: GET_CATEGORY_FAILURE,
                payload: err
            })
        }
    }
}

export const addCategory = (newCate) => {
    console.log('new cate', newCate)
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/category`, newCate)
            const categories = await axios.get(`${API_URL}/category/session/${newCate.sessionID}`)
            dispatch({
                type: ADD_CATEGORY_SUCCESS,
                payload: categories.data
            })
        } catch (err){
            dispatch({
                type: ADD_CATEGORY_FAILURE,
                payload: err
            })
        }
    }
}

export const updateCategory = (change, cateID) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/category/${cateID}`, change)
            console.log('res in updating category', res.data)
        } catch (err){
            dispatch({
                type: UPDATE_CATEGORY_FAILURE,
                payload: err
            })
        }
    }
}

export const changeCategory = (categoryToChange) => {
    return {
        type: CHANGE_CATEGORY,
        payload: categoryToChange
    }
}

export const deleteCategory = (categoryId) => {
    return async dispatch => {
        try {
            const res = axios.delete(`${API_URL}/category/${categoryId}`)
            console.log('res in deleting category', res.data)
        } catch (err){
            dispatch({
                type: DELETE_CATEGORY_FAILURE,
                payload: err
            })
        }
    }
}