import axios from "axios";
import { API_URL } from '../../apiConfig';
import DragDropMini from '../../modules/dragdrop1/mini/dragdrop1.mini';
import QuizMini from '../../modules/quiz/mini/quiz.mini';
export const PUBLISH_COURSE = 'PUBLISH_COURSE';
export const GET_SESSIONS_FAILURE = 'GET_SESSIONS_FAILURE';
export const GET_MODULES_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULES_FAILURE = 'GET_MODULE_FAILURE';
export const ARRANGE_SESSION_BY_ORDER = 'ARRANGE_SESSIONS_BY_ORDER';
export const GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS'

export const publishCourse = isPublished => {
    return {
        type: PUBLISH_COURSE,
        payload: isPublished
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


export const createSession = () => {

}

export const deleteSession = () => {

}


