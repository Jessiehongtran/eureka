import { GET_HEADER_SUCCESS, GET_HEADER_FAILURE, GET_HEADER_EMPTY, CHANGE_HEADER, ADD_HEADER_SUCCESS, ADD_HEADER_FAILURE, UPDATE_HEADER_FAILURE, GET_VIDEO_SUCCESS, GET_VIDEO_EMPTY, CHANGE_VIDEO, CHANGE_LINK  } from '../actions/videoAction';

const initialState = {
    header: {},
    video: {},
    video_file: null,
    link: ""
}

export const videoReducer = (state=initialState, action) => {
    switch (action.type){
        case GET_HEADER_SUCCESS:
            return {
                ...state,
                header: action.payload
            }
        case GET_HEADER_EMPTY:
            return {
                ...state,
                header: action.payload
            }
        case CHANGE_HEADER:
            return {
                ...state,
                header: {
                    ...state.header,
                    text: action.payload.text
                }
            }
        case GET_VIDEO_SUCCESS:
            return {
                ...state,
                video: action.payload
            }
        case GET_VIDEO_EMPTY:
            return {
                ...state,
                video: action.payload
            }
        case CHANGE_VIDEO:
            return {
                ...state,
                video_file: action.payload
            }
        case CHANGE_LINK:
            return {
                ...state,
                link: action.payload
            }
        default:
            return state;
    }
}