import { PUBLISH_COURSE, GET_CONTENT_SUCCESS, GET_CONTENT_FAILURE } from '../actions/courseActions';

const initialState = {
    isPublished: false,
    courseID: 0,
    content: {},
    sessions: [
        {
            sessionID: 0,
            moduleID: 0,
            content: {}
        }
    ],

}

export const courseReducer = (state=initialState, action) => {
    switch(action.type){
        case PUBLISH_COURSE:
            return {
                ...state,
                isPublished: action.payload
            }
        case GET_CONTENT_SUCCESS:
            return {
                ...state,
                content: action.payload
            }
        default:
            return state;
    }
}
