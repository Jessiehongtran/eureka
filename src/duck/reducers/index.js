import { combineReducers } from 'redux';
import { courseReducer } from './courseReducer';
import { quizReducer } from './quizReducer';
import { dragdropReducer } from './dragdropReducer';
import { videoReducer } from './videoReducer';

export default combineReducers({
    courseReducer,
    quizReducer,
    dragdropReducer,
    videoReducer
})