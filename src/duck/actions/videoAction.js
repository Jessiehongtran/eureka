import axios from 'axios';
import { API_URL } from '../../apiConfig';
export const GET_HEADER_SUCCESS = 'GET_HEADER_SUCCESS';
export const GET_HEADER_FAILURE = 'GET_HEADER_FAILURE';
export const GET_HEADER_EMPTY = 'GET_HEADER_EMPTY';
export const ADD_HEADER_SUCCESS = 'ADD_HEADER_SUCCESS';
export const ADD_HEADER_FAILURE = 'ADD_HEADER_FAILURE';
export const CHANGE_HEADER = 'CHANGE_HEADER';
export const UPDATE_HEADER_FAILURE = 'UPDATE_HEADER_FAILURE';
export const GET_VIDEO_SUCCESS = 'GET_VIDEO_SUCCESS';
export const GET_VIDEO_EMPTY = 'GET_VIDEO_EMPTY';
export const CHANGE_VIDEO = 'CHANGE_VIDEO';
export const CHANGE_LINK = 'CHANGE_LINK'

export const getHeader = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/text/session/${sessionID}`)
            console.log('res in getting header of video within redux', res.data)
            if (res.data.length > 0){
                dispatch({
                    type: GET_HEADER_SUCCESS,
                    payload: res.data[0]
                })
            } else {
                dispatch({
                    type: GET_HEADER_EMPTY,
                    payload: {}
                })
            }
        } catch (err){
            dispatch({
                type: GET_HEADER_FAILURE,
                payload: err
            })
        }
    }
}

export const addHeader = (newHeader) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/text`, newHeader)
            console.log('res in posting header', res.data)
            dispatch({
                type: ADD_HEADER_SUCCESS,
                payload: res.data
            })
        } catch (err){
            dispatch({
                type: ADD_HEADER_FAILURE,
                payload: err
            })
        }
    }
}

export const updateHeader = (change, headerID) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/text/${headerID}`, change)
            console.log('res in updating header', res.data)
        } catch (err){
            dispatch({
                type: UPDATE_HEADER_FAILURE,
                payload: err
            })
        }
    }
}

export const changeHeader = (headerToChange) => {
    console.log('changing header of video')
    return {
        type: CHANGE_HEADER,
        payload: headerToChange
    }
}

export const getVideo = (sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/video/session/${sessionID}`)
            if (res.data && res.data.id){
                dispatch({
                    type: GET_VIDEO_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: GET_VIDEO_EMPTY,
                    payload: {}
                })
            }
        } catch (err){
            console.error(err)
        }
    }
}

export const addVideo = (videoData, sessionID) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/video/session/${sessionID}`, videoData, 
                                    {
                                        headers: {'Content-Type': 'multipart/form-data'}
                                    }
                                )
            console.log('res in posting video', res.data)
        } catch (err){
            console.error(err)
        }
    }
}

export const changeVideo = (video_file) => {
    return {
        type: CHANGE_VIDEO,
        payload: video_file
    }
}

export const changeLink = (link) => {
    return {
        type: CHANGE_LINK,
        payload: link
    }
}

export const updateVideo = (change, videoID) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`${API_URL}/video/${videoID}`, change)
            console.log(res.data)
        } catch (err){
            console.error(err)
        }
    }
}