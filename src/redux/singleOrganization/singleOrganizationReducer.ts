import {
    Organization,
    GET_SINGLE_ORGANIZATION,
    SINGLE_ORGANIZATION_LOADING,
    SINGLE_ORGANIZATION_ERROR,
    SingleOrganizationDispatchTypes
} from './singleOrganizationActionTypes'

interface InitialStateI {
    organization?: Organization,
    loading: boolean,
    error: boolean,
}

const initialState = {
    loading: false,
    error: false
}

const singleOrganizationReducer = (state: InitialStateI = initialState, action: SingleOrganizationDispatchTypes): InitialStateI => {
    switch (action.type) {
        case GET_SINGLE_ORGANIZATION:
            return {
                ...state,
                organization: action.payload
            }
        case SINGLE_ORGANIZATION_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SINGLE_ORGANIZATION_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}


export default singleOrganizationReducer
