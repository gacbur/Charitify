export const GET_SINGLE_ORGANIZATION = "GET_SINGLE_ORGANIZATION"
export const SINGLE_ORGANIZATION_LOADING = "SINGLE_ORGANIZATION_LOADING"
export const SINGLE_ORGANIZATION_ERROR = "SINGLE_ORGANIZATION_ERROR"

export type Organization = {
    id: number,
    name: string,
    addressLine1: string,
    addressLine2: string,
    country: string,
    city: string,
    state: string,
    url: string,
    logoUrl: string,
    mission: string,
    totalProjects: number,
    activeProjects: number,
}

export interface GetSingleOrganization {
    type: typeof GET_SINGLE_ORGANIZATION,
    payload: Organization
}

export interface SingleOrganizationLoading {
    type: typeof SINGLE_ORGANIZATION_LOADING,
    payload: boolean
}

export interface SingleOrganizationError {
    type: typeof SINGLE_ORGANIZATION_ERROR,
    payload: boolean
}

export type SingleOrganizationDispatchTypes = GetSingleOrganization | SingleOrganizationLoading | SingleOrganizationError