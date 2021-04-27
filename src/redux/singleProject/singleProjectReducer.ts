import {
    project,
    GET_SINGLE_PROJECT,
    GET_SINGLE_PROJECT_ERROR,
    GET_SINGLE_PROJECT_LOADING,
    SingleProjectDispatchTypes
} from './singleProjectActionTypes'

interface InitialStateI {
    singleProject?: project,
    loading: boolean,
    error: boolean
}

const initialState: InitialStateI = {
    loading: false,
    error: false,
}

const singleProjectReducer = (state: InitialStateI = initialState, action: SingleProjectDispatchTypes): InitialStateI => {
    switch (action.type) {
        case GET_SINGLE_PROJECT:
            return {
                singleProject: action.payload,
                ...state
            }
        case GET_SINGLE_PROJECT_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case GET_SINGLE_PROJECT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default singleProjectReducer


