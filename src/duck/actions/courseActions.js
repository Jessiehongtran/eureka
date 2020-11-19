import Axios from "axios";
import { API_URL } from '../../apiConfig';
export const CREATE_COURSE = 'CREATE_COURSE';
export const CREATE_SESSION = 'CREATE_SESSION';
export const ADD_MODULE = 'ADD_MODULE';
export const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
export const GET_CONTENT_FAILURE = 'GET_CONTENT_FAILURE';
export const UPDATE_CONTENT_SUCCESS = 'UPDATE_CONTENT_SUCCESS';
export const UPDATE_CONTENT_FAILURE = 'UPDATE_CONTENT_FAILURE';
export const ADD_CONTENT_SUCCESS = 'ADD_CONTENT_SUCCESS';
export const ADD_CONTENT_FAILURE = 'ADD_CONTENT_FAILURE';
export const PUBLISH_COURSE = 'PUBLISH_COURSE';

export const publishCourse = isPublished => {
    return {
        type: PUBLISH_COURSE,
        payload: isPublished
    }
}

export const createCourse = () => {

}

export const createSession = () => {

}



export const getContent = (sessionID, moduleID) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`${API_URL}/session/content/${sessionID}/${moduleID}`)
            console.log('res in getting for the session', res.data)
            dispatch({
                type: GET_CONTENT_SUCCESS,
                payload: res.data
            })
        } catch (err){
            dispatch({
                type: GET_CONTENT_FAILURE,
                payload: err
            })
        }
    }
}