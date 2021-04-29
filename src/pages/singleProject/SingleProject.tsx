import { FC, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RouteComponentProps, withRouter } from 'react-router';

import axios from 'axios'

import ClipLoader from 'react-spinners/ClipLoader'

import { RootStore } from '../../redux/Store'

import { getSingleProject, getSingleProjectError, getSingleProjectLoading } from '../../redux/singleProject/singleProjectActions'
import { donationOption, imageLink } from '../../redux/singleProject/singleProjectActionTypes'

import "./SingleProject.css"

type SingleProjectParams = {
    id: string
}

type SingleProjectProps = RouteComponentProps<SingleProjectParams>

const SingleProject: FC<SingleProjectProps> = ({ match }) => {

    const dispatch = useDispatch()

    const singleProjectLoading = useSelector((state: RootStore) => state.singleProject.loading)
    const singleProjectError = useSelector((state: RootStore) => state.singleProject.error)
    const singleProject = useSelector((state: RootStore) => state.singleProject.singleProject)


    useEffect(() => {

        dispatch(getSingleProjectLoading(true))
        axios.get(`https://api.globalgiving.org/api/public/projectservice/projects/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.data.project)
            .then(project => {
                dispatch(getSingleProjectLoading(false))
                dispatch(getSingleProject({
                    id: project.id,
                    title: project.title,
                    image: project.imageLink,
                    activities: project.activites,
                    summary: project.summary,
                    contactUrl: project.contactUrl,
                    donationOptions: project.donationOptions.donationOption.map((item: donationOption) => {
                        return {
                            amount: item.amount,
                            description: item.description
                        }
                    }),
                    numberOfDonations: project.numberOfDonations,
                    funding: project.funding,
                    goal: project.goal,
                    imageLinks: project.image.imagelink.map((item: imageLink) => {
                        return {
                            url: item.url,
                            size: item.size
                        }
                    }),
                    longTermImpact: project.longTermImpact,
                    need: project.need,
                    projectOrganization: {
                        id: project.organization.id,
                        name: project.organization.name,
                        mission: project.organization.mission,
                        country: project.organization.country,
                        city: project.organization.city,
                        addressLine1: project.organization.addressLine1,
                        addressLine2: project.organization.addressLine2,
                        activeProjects: project.organization.activeProjects,
                        logoUrl: project.organization.logoUrl,
                    },

                    latitude: project.latitude,
                    longitude: project.longitude
                }))
            })
            .catch(() => {
                dispatch(getSingleProjectLoading(false))
                dispatch(getSingleProjectError(true))
            })

    }, [match.params.id, dispatch])

    return (
        <div className="single-project">
            {singleProjectLoading && <div className="single-project__loading">
                <ClipLoader size={80} color="rgba(2,169,92,0.72)" />
            </div>}
            <div className="single-project__content">

            </div>
            {singleProjectError && <div className="single-project__error">
                Something went wrong sorry, go to home page.
            </div>}
        </div>
    )
}

export default withRouter(SingleProject)
