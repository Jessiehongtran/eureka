import { combineReducers } from 'redux';
import { courseReducer } from './courseReducer';
import { quizReducer } from './quizReducer';

export default combineReducers({
    courseReducer,
    quizReducer
})