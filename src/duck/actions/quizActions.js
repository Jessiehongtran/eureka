import axios from "axios";
import { API_URL } from '../../apiConfig';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';
export const GET_QUESTION_EMPTY = 'GET_QUESTION_EMPTY';
export const GET_ANSWERS_SUCCESS = 'GET_ANSWERS_SUCCESS';
export const GET_ANSWERS_EMPTY = 'GET_ANSWERS_EMPTY';
export const GET_ANSWERS_FAILURE = 'GET_ANSWERS_FAILURE';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const UPDATE_QUESTION_FAILURE = 'UPDATE_QUESTION_FAILURE';
export const POST_QUESTION_FAILURE = 'POST_QUESTION_FAILURE';
export const GET_CHOICES = 'GET_CHOICES';
export const CHANGE_CHOICE = 'CHANGE_CHOICE';
export const UPDATE_CHOICE_FAILURE = 'UPDATE_CHOICE_FAILURE';
export const POST_CHOICE_FAILURE = 'POST_CHOICE_FAILURE';
export const CHANGE_CHOICE_CORRECT = 'CHANGE_CHOICE_CORRECT';
export const GET_IMAGE_SUCCESS = 'GET_IMAGE_SUCCESS';
export const GET_IMAGE_EMPTY = 'GET_IMAGE_EMPTY';
export const GET_IMAGE_FAILURE = 'GET_IMAGE_FAILURE';
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS';
export const UPDATE_UPLOAD_STATUS = 'UPDATE_UPLOAD_STATUS';
export const POST_IMAGE_SUCCESS = 'POST_IMAGE_SUCCESS';

export const getQuestion = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/question/session/${sessionID}`)
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
                        sessionID: sessionID
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


export const changeQuestion = (changedQuestion) => {
    return {
        type: CHANGE_QUESTION,
        payload: changedQuestion
    }
}

export const postQuestion = (question) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/question`, question)
            console.log('res in posting question', res.data)
            
        } catch (err){
            dispatch({
                type: POST_QUESTION_FAILURE,
                payload: err
            })
        }
    }
}

export const updateQuestion = (updatedQuestion) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/question/${updatedQuestion.id}`, {
                question_text: updatedQuestion.question_text
            })
            console.log('res in updating question', res.data)
            getQuestion(updatedQuestion.sessionID)
            
        } catch (err){
            dispatch({
                type: UPDATE_QUESTION_FAILURE,
                payload: err
            })
        }
    }
}

export const getChoices = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/choice/session/${sessionID}`)
            if (res.data.length > 0){
                let choices = res.data;
                const original_length = choices.length;
                if (original_length < 4){
                    let i = 0
                    while (i < 4 - original_length ){
                        choices.push(
                            {
                                id: original_length + i + 1,
                                choice_text: "",
                                isCorrect: false,
                                sessionID: 0
                            }
                        )
                        i += 1
                        
                    }
                }                
                dispatch({
                    type: GET_ANSWERS_SUCCESS,
                    payload: choices
                })
            } else {
                dispatch({
                    type: GET_ANSWERS_EMPTY,
                    payload:  [
                        {
                            id: 1,
                            choice_text: "",
                            isCorrect: false,
                            sessionID: 0
                        },
                        {
                            id: 2,
                            choice_text: "",
                            isCorrect: false,
                            sessionID: 0
                        },
                        {
                            id: 3,
                            choice_text: "",
                            isCorrect: false,
                            sessionID: 0
                        },
                        {
                            id: 4,
                            choice_text: "",
                            isCorrect: false,
                            sessionID: 0
                        }
                    ]
                })
            }
        } catch (err){
            dispatch({
                type: GET_ANSWERS_FAILURE
            })
        }
    }
}

export const postChoice = newChoice => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/choice`, newChoice)
            console.log('res in posting choice', res.data)
            
        } catch (err){
            dispatch({
                type: POST_CHOICE_FAILURE,
                payload: err
            })
        }
    }
}

export const changeChoice = choiceToUpdate => {
    return {
        type: CHANGE_CHOICE,
        payload: choiceToUpdate
    }
}

export const changeChoiceCorrect = choiceToUpdate => {
    return {
        type: CHANGE_CHOICE_CORRECT,
        payload: choiceToUpdate
    }
}

export const updateChoice = updatedChoice => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/choice/${updatedChoice.id}`, {
                choice_text: updatedChoice.choice_text
            })
            console.log('res in updating choice', res.data)
            getChoices(updatedChoice.sessionID)
            
        } catch (err){
            dispatch({
                type: UPDATE_CHOICE_FAILURE,
                payload: err
            })
        }
    }
}

export const getImage = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/image/session/${sessionID}`)
            console.log('res in getting image', res.data)
            if (res.data.length > 0){
                dispatch({
                    type: GET_IMAGE_SUCCESS,
                    payload: {
                        image: res.data[0],
                        image_uploading: false,
                        showUploadFunc: false
                    }
                })
            } else {
                dispatch({
                    type: GET_IMAGE_EMPTY,
                    payload: {
                        image: {
                            id: 0,
                            image_url: "",
                            sessionID: 0
                        },
                        image_uploading: false,
                        showUploadFunc: true
                    }
                })
            }
        } catch (err){
            dispatch({
                type: GET_IMAGE_FAILURE,
                payload: err
            })
        }
    }
}

export const postImage = (imageData, sessionID) => {
    console.log('imageData', imageData, 'sessionID', sessionID )
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/image/session/${sessionID}`, imageData, {
                                        headers: {
                                        'Content-Type': 'multipart/form-data'
                                        }
                                    })
            console.log('res in uploading image', res.data)
            //dispatch post success?
            dispatch({
                type: POST_IMAGE_SUCCESS,
                payload: {
                    image_url: res.data.uploaded_img, 
                    image_uploading: false
                }
            })
        } catch (err){
            console.error(err)
            //dispatch err
        }
    }
}

export const removeImage = (imageID) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`${API_URL}/image/${imageID}`)
            console.log('res in deleting image', res.data)
            dispatch({
                type: REMOVE_IMAGE_SUCCESS,
                payload: {
                    showUploadFunc: true
                }
            })
        } catch (err){
            console.error(err)
        }
    }
}

export const updateUploadStatus = (status) => {
    return {
        type: UPDATE_UPLOAD_STATUS,
        payload: status
    }
}

