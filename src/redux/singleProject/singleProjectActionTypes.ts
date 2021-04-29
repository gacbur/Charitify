export const GET_SINGLE_PROJECT = "GET_SINGLE_PROJECT"
export const GET_SINGLE_PROJECT_LOADING = "GET_SINGLE_PROJECT_LOADING"
export const GET_SINGLE_PROJECT_ERROR = "GET_SINGLE_PROJECT_ERROR"


export type donationOption = {
    amount: number,
    description: string
}

export type imageLink = {
    url: string,
    size: string
}

export type projectOrganization = {
    id: number,
    name: string,
    mission: string,
    country: string,
    city?: string,
    addressLine1?: string,
    addressLine2?: string,
    activeProjects: number,
    logoUrl: string,
}

export type project = {
    id: number,
    title: string,
    image: string,
    activities: string,
    summary: string,
    contactUrl: string,
    donationOptions: donationOption[],
    numberOfDonations: number,
    funding: number,
    goal: number,
    imageLinks: imageLink[],
    longTermImpact?: string,
    need?: string,
    projectOrganization: projectOrganization,
    latitude: number,
    longitude: number
}

export interface getSingleProject {
    type: typeof GET_SINGLE_PROJECT,
    payload: project
}

export interface getSingleProjectLoading {
    type: typeof GET_SINGLE_PROJECT_LOADING,
    payload: boolean
}

export interface getSingleProjectError {
    type: typeof GET_SINGLE_PROJECT_ERROR,
    payload: boolean
}

export type SingleProjectDispatchTypes = getSingleProject | getSingleProjectLoading | getSingleProjectError