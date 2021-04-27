import { Dispatch } from 'redux'
import {
    project,
    GET_SINGLE_PROJECT,
    GET_SINGLE_PROJECT_ERROR,
    GET_SINGLE_PROJECT_LOADING,
    SingleProjectDispatchTypes
} from './singleProjectActionTypes'

export const getSingleProject = (project: project) => (dispatch: Dispatch<SingleProjectDispatchTypes>, getState: any) => {
    dispatch({
        type: GET_SINGLE_PROJECT,
        payload: project
    })
}

export const getSingleProjectError = (error: boolean) => (dispatch: Dispatch<SingleProjectDispatchTypes>, getState: any) => {
    dispatch({
        type: GET_SINGLE_PROJECT_ERROR,
        payload: error
    })
}

export const getSingleProjectLoading = (loading: boolean) => (dispatch: Dispatch<SingleProjectDispatchTypes>, getState: any) => {
    dispatch({
        type: GET_SINGLE_PROJECT_LOADING,
        payload: loading
    })
}