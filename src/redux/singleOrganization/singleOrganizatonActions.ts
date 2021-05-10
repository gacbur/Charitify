import { Dispatch } from 'redux'
import {
    Organization,
    GET_SINGLE_ORGANIZATION,
    SINGLE_ORGANIZATION_ERROR,
    SINGLE_ORGANIZATION_LOADING,
    SingleOrganizationDispatchTypes
} from './singleOrganizationActionTypes'

export const getSingleOrganization = (organization: Organization) => (dispatch: Dispatch<SingleOrganizationDispatchTypes>, getState: any) => {
    dispatch({
        type: GET_SINGLE_ORGANIZATION,
        payload: organization
    })
}

export const singleOrganizationLoading = (loading: boolean) => (dispatch: Dispatch<SingleOrganizationDispatchTypes>, getState: any) => {
    dispatch({
        type: SINGLE_ORGANIZATION_LOADING,
        payload: loading
    })
}

export const singleOrganizationError = (error: boolean) => (dispatch: Dispatch<SingleOrganizationDispatchTypes>, getState: any) => {
    dispatch({
        type: SINGLE_ORGANIZATION_ERROR,
        payload: error
    })
}