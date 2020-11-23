import { combineReducers } from 'redux';
import { courseReducer } from './courseReducer';
import { quizReducer } from './quizReducer';
import { dragdropReducer } from './dragdropReducer';

export default combineReducers({
    courseReducer,
    quizReducer,
    dragdropReducer
})