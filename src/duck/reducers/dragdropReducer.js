import { GET_HEADER_SUCCESS, GET_HEADER_FAILURE, CHANGE_HEADER, ADD_HEADER_SUCCESS, ADD_HEADER_FAILURE, GET_CATEGORY_SUCCESS, CHANGE_CATEGORY, GET_CATEGORY_FAILURE, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE,  UPDATE_HEADER_FAILURE } from '../actions/dragdropActions';

const initialState = {
    header: {},
    category_list: []
}

export const dragdropReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_HEADER_SUCCESS:
            return {
                ...state,
                header: action.payload
            }
        case CHANGE_HEADER:
            return {
                ...state,
                header: {
                    ...state.header,
                    text: action.payload
                }
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category_list: action.payload
            }
        case ADD_CATEGORY_SUCCESS:
            return {
                    ...state,
                    category_list: action.payload
                }
        case CHANGE_CATEGORY:
            return {
                ...state,
                category_list: state.category_list.map(
                    cate => cate.id === action.payload.id ? {...cate, category_name: action.payload.category_name}
                                                          : cate
                )
            }
        default:
            return state;
    }
}