import axios from "axios";
import { API_URL } from '../../apiConfig';
export const PUBLISH_COURSE = 'PUBLISH_COURSE';
export const GET_SESSIONS_FAILURE = 'GET_SESSIONS_FAILURE';
export const GET_MODULES_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULES_FAILURE = 'GET_MODULE_FAILURE';
export const ARRANGE_SESSION_BY_ORDER = 'ARRANGE_SESSIONS_BY_ORDER';
export const GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS';
export const UPDATE_PUBLISH_COURSE = 'UPDATE_PUBLISH_COURSE';
export const GET_COURSE_PUBLISH_STATUS = 'GET_COURSE_PUBLISH_STATUS';


export const publishCourse = (isPublished, courseID, history) => {
    if (history){
        history.push(`/course/${courseID}/view`) 
    }
    return {
        type: PUBLISH_COURSE,
        payload: isPublished
    }
}

export const getPublishCourseState = (courseID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/course/${courseID}`)
            dispatch({
                type: GET_COURSE_PUBLISH_STATUS,
                payload: {
                    isPublished: res.data.isPublished,
                }
            })
        } catch (err){
            console.error(err)
        }
    }
}

export const updatePublishCourse = (status, courseID) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/course/${courseID}`, { isPublished: status })
            dispatch({
                type: UPDATE_PUBLISH_COURSE,
                payload: {
                    isPublished: status,
                    response: res
                }
            })
        } catch (err){
            console.error(err)
        }
    }
}

export const createCourse = (course, history) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/course`, course)
            console.log('res in creating page', res.data)
            const courseID = res.data.id
            history.push(`/course/${courseID}`)
        } catch (err){
            console.error(err)
        }
    }
}

export const getSessions = () => {

}


export const createSession = () => {

}

export const deleteSession = () => {

}


