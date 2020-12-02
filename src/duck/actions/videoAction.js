import axios from 'axios';
import { API_URL } from '../../apiConfig';
export const GET_HEADER_SUCCESS = 'GET_HEADER_SUCCESS';
export const GET_HEADER_FAILURE = 'GET_HEADER_FAILURE';
export const GET_HEADER_EMPTY = 'GET_HEADER_EMPTY';
export const ADD_HEADER_SUCCESS = 'ADD_HEADER_SUCCESS';
export const ADD_HEADER_FAILURE = 'ADD_HEADER_FAILURE';
export const CHANGE_HEADER = 'CHANGE_HEADER';
export const UPDATE_HEADER_FAILURE = 'UPDATE_HEADER_FAILURE';

export const getHeader = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/text/session/${sessionID}`)
            console.log('res in getting header of video', res.data)
            if (res.data.length > 0){
                dispatch({
                    type: GET_HEADER_SUCCESS,
                    payload: res.data[0]
                })
            } else {
                dispatch({
                    type: GET_HEADER_EMPTY,
                    payload: {}
                })
            }
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
    console.log('changing header of video')
    return {
        type: CHANGE_HEADER,
        payload: headerToChange
    }
}