import Axios from "axios";
import { API_URL } from '../../apiConfig';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';
export const GET_QUESTION_EMPTY = 'GET_QUESTION_EMPTY';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const GET_CHOICES = 'GET_CHOICES';
export const UPDATE_CHOICE = 'UPDATE_CHOICE';


export const getQuestion = (sessionID) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`${API_URL}/question/${sessionID}`)
            console.log('res in getting question', res.data)
            if (res.data){
                dispatch({
                    type: GET_QUESTION_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: GET_QUESTION_EMPTY,
                    payload: {
                        id: 0,
                        question_text: "",
                        sessionID: 0
                    }
                })
            }
        } catch (err){
            dispatch({
                type: GET_QUESTION_FAILURE,
                payload: err
            })
        }
    }
}

export const updateQuestion = newQuestion => {
    return {
        type: UPDATE_QUESTION,
        payload: newQuestion
    }
}

export const updateChoice = choiceToUpdate => {
    return {
        type: UPDATE_CHOICE,
        payload: choiceToUpdate
    }
}
