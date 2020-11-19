import { UPDATE_QUESTION, UPDATE_CHOICE } from '../actions/quizActions';

const initialState = {
    sessionID: 0,
    question: {
        questionID: 0,
        question_text: ""
    },
    choices: [
        {
            choiceID: 1,
            choice_text: "",
            isCorrect: false
        },
        {
            choiceID: 2,
            choice_text: "",
            isCorrect: false
        },
        {
            choiceID: 3,
            choice_text: "",
            isCorrect: false
        },
        {
            choiceID: 4,
            choice_text: "",
            isCorrect: false
        }
    ]
}

export const quizReducer = ( state=initialState, action ) => {
    switch(action.type){
        case UPDATE_QUESTION:
            return {
                ...state, 
                question: action.payload
            }
        case UPDATE_CHOICE:       
            return {
                ...state,
                choices: state.choices.map(
                    (choice) => choice.choiceID === action.payload.choiceID ? {...choice, choice_text: action.payload.choice_text}
                                            : choice
                )
            }
        default: 
            return state;
    }
}