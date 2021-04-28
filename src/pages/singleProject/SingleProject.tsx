import { FC, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { RouteComponentProps, withRouter } from 'react-router';

import axios from 'axios'

import { getSingleProject } from '../../redux/singleProject/singleProjectActions'
import { donationOption, imageLink } from '../../redux/singleProject/singleProjectActionTypes'

import "./SingleProject.css"

type SingleProjectParams = {
    id: string
}

type SingleProjectProps = RouteComponentProps<SingleProjectParams>

const SingleProject: FC<SingleProjectProps> = ({ match }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(match.params.id)

        axios.get(`https://api.globalgiving.org/api/public/projectservice/projects/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.data.project)
            .then(project => dispatch(getSingleProject({
                id: project.id,
                title: project.title,
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
            })))

    }, [match.params.id, dispatch])

    return (
        <div className="single-project">
            SingleProject
        </div>
    )
}

export default withRouter(SingleProject)
