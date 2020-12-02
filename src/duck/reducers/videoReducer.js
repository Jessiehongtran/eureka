import { GET_HEADER_SUCCESS, GET_HEADER_FAILURE, GET_HEADER_EMPTY, CHANGE_HEADER, ADD_HEADER_SUCCESS, ADD_HEADER_FAILURE, UPDATE_HEADER_FAILURE  } from '../actions/videoAction';

const initialState = {
    header: {}
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
        default:
            return state;
    }
}