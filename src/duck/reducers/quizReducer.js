import { CHANGE_QUESTION, UPDATE_QUESTION, REMOVE_IMAGE_SUCCESS, GET_IMAGE_SUCCESS, UPDATE_UPLOAD_STATUS, CHANGE_CHOICE, CHANGE_CHOICE_CORRECT, GET_QUESTION_FAILURE, GET_QUESTION_SUCCESS, GET_QUESTION_EMPTY, GET_ANSWERS_SUCCESS, GET_ANSWERS_EMPTY, POST_IMAGE_SUCCESS } from '../actions/quizActions';

const initialState = {
    sessionID: 0,
    question: {
        id: 0,
        question_text: "",
        sessionID: 0
    },
    image: {
        id: 0,
        image_url: "",
        sessionID: 0
    },
    image_uploading: false,
    showUploadFunc: true,
    choices: [
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
}

export const quizReducer = ( state=initialState, action ) => {
    switch(action.type){
        case GET_QUESTION_SUCCESS:
            return {
                ...state,
                question: action.payload,
                sessionID: action.payload.sessionID
            }
        case GET_QUESTION_EMPTY:
            return {
                ...state,
                question: action.payload,
                sessionID: action.payload.sessionID
            }
        case CHANGE_QUESTION:
                return {
                    ...state,
                    question: action.payload
                }
        case UPDATE_QUESTION:
            return {
                ...state, 
                question: action.payload
            }
        case GET_ANSWERS_SUCCESS:
            return {
                ...state,
                choices: action.payload
            }
        case GET_ANSWERS_EMPTY:
            return {
                ...state,
                choices: action.payload
            }
        case CHANGE_CHOICE:       
            return {
                ...state,
                choices: state.choices.map(
                    (choice) => choice.id === action.payload.id ? {...choice, choice_text: action.payload.choice_text}
                                            : choice
                )
            }
        case CHANGE_CHOICE_CORRECT:       
            return {
                ...state,
                choices: state.choices.map(
                    (choice) => choice.id === action.payload.id ? {...choice, isCorrect: action.payload.isCorrect}
                                            : choice
                )
            }
        case GET_IMAGE_SUCCESS:
            return {
                ...state,
                image: action.payload.image,
                showUploadFunc: action.payload.showUploadFunc,
                image_uploading: action.payload.image_uploading
            }
        case REMOVE_IMAGE_SUCCESS:
            return {
                ...state,
                showUploadFunc: action.payload.showUploadFunc
            }
        case UPDATE_UPLOAD_STATUS:
            return {
                ...state,
                showUploadFunc: action.payload.showUploadFunc,
                image_uploading: action.payload.image_uploading
            }
        case POST_IMAGE_SUCCESS:
            return {
                ...state,
                image_uploading: action.payload.image_uploading,
                image: {
                    ...state.image,
                    image_url: action.payload.image_url
                }
            }
        default: 
            return state;
    }
}