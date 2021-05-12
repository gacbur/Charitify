import { useEffect, useState } from 'react'

import axios from 'axios'

const useFetchOrgProjects = (
    OrganizationId: string,
    organizationProjects: any,
    setOrganizationProjects: any,
    setNextId: any,
    nextId: any,
    loadMore: any
) => {

    const [projectsLoading, setProjectsLoading] = useState(false)
    const [projectsError, setProjectsError] = useState(false)

    const BASE_URL = `https://api.globalgiving.org/api/public/projectservice/organizations/${OrganizationId}/projects/active?api_key=${process.env.REACT_APP_API_KEY}`

    useEffect(() => {
        if (loadMore === 0) {
            setProjectsLoading(true)
            setProjectsError(false)
            axios.get(BASE_URL)
                .then(res => res.data.projects)
                .then(projects => {
                    console.log(projects)
                    setNextId(projects.nextProjectId)
                    setOrganizationProjects([...projects.project])
                    setProjectsLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setProjectsError(true)
                })
        }
    }, [])

    useEffect(() => {
        if (loadMore > 0) {
            setProjectsLoading(true)
            setProjectsError(false)
            axios.get(`${BASE_URL}&nextProjectId=${nextId}`)
                .then(res => res.data.projects)
                .then(projects => {
                    setNextId(projects.nextProjectId)
                    setOrganizationProjects([...organizationProjects, ...projects.project])
                    setProjectsLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setProjectsError(true)
                })
        }
    }, [loadMore])

    return {
        projectsLoading,
        projectsError
    }
}

export default useFetchOrgProjects
