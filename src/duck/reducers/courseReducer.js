import { PUBLISH_COURSE } from '../actions/courseActions';

const initialState = {
    isPublished: false,
    courseID: 0,
    sessions: [],

}

export const courseReducer = (state=initialState, action) => {
    switch(action.type){
        case PUBLISH_COURSE:
            return {
                ...state,
                isPublished: action.payload
            }
        default:
            return state;
    }
}
