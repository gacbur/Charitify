import { FC, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RouteComponentProps, withRouter } from 'react-router';

import axios from 'axios'

import "react-responsive-carousel/lib/styles/carousel.min.css";
//@ts-ignore
import { Carousel } from 'react-responsive-carousel';

import ClipLoader from 'react-spinners/ClipLoader'

import { RootStore } from '../../redux/Store'

import { getSingleProject, getSingleProjectError, getSingleProjectLoading } from '../../redux/singleProject/singleProjectActions'
import { donationOption, imageLink } from '../../redux/singleProject/singleProjectActionTypes'

import { BiLinkExternal } from 'react-icons/bi'
import { BiHeart } from 'react-icons/bi'

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

    const [galleryItems, setGalleryItems] = useState([])


    useEffect(() => {

        axios.get(`https://api.globalgiving.org/api/public/projectservice/projects/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.data.project)
            .then(project => {
                dispatch(getSingleProjectLoading(false))
                dispatch(getSingleProject({
                    id: project.id,
                    title: project.title,
                    active: project.active,
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

    }, [match.params.id])


    useEffect(() => {

        axios.get(`https://api.globalgiving.org/api/public/projectservice/projects/${match.params.id}/imagegallery?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.data.images.image)
            .then(images => {
                setGalleryItems(images)
            })
    }, [match.params.id])

    return (
        <div className="single-project">
            {singleProjectLoading && <div className="single-project__loading">
                <ClipLoader size={80} color="rgba(2,169,92,0.72)" />
            </div>}
            {singleProject && <div className="single-project__content">
                <div className="single-project__header">
                    <div className="header__image-carousel">

                        {galleryItems.length > 0 && <Carousel
                            className="carousel"
                            showArrows
                            showStatus
                            showThumbs={false}
                            stopOnHover
                        >
                            {galleryItems.map((item: any) => {
                                return (
                                    <div className="carousel__item-cnt" key={item.id}>
                                        <div className="carousel__item" style={{ backgroundImage: `url(${item.imagelink[5].url})` }}>
                                        </div>
                                    </div>
                                )
                            })}
                        </Carousel>}
                    </div>
                    <div className="header__main-text">
                        <h3 className="is-active" style={{
                            color: singleProject.active ? '#028045' : '#32404e'
                        }}>
                            {singleProject.active ? 'FUNDING' : "NOT FUNDING"}
                        </h3>
                        <h2 className="title">
                            {singleProject.title}
                        </h2>
                        <h3 className="organization-name">
                            {singleProject.projectOrganization.name}
                        </h3>
                        <h3 className="organization-country">
                            {singleProject.projectOrganization.country}
                        </h3>
                        <div className="goal-bar">
                            <div className="img-overlay__goal">
                                <div className="progress-bar">
                                    <p className="progress-bar__total">
                                        {`($${singleProject.funding} of $${singleProject.goal})`}
                                    </p>
                                    <div className="progress-bar-full" style={{ width: `${(singleProject.funding / singleProject.goal) * 100}%` }}>
                                    </div>
                                </div>
                                <p className="procentage">{((singleProject.funding / singleProject.goal) * 100).toFixed(0)}% of ${singleProject.goal} and {singleProject.numberOfDonations} donations.</p>
                            </div>
                        </div>
                        <div className="action-btns">
                            <button className="donate">
                                DONATE <i><BiLinkExternal /></i>
                            </button>
                            <button className="follow">
                                FOLLOW <i><BiHeart /></i>
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="header-separator" />
            </div>}
            {singleProjectError && <div className="single-project__error">
                Something went wrong sorry, go to home page.
            </div>}
        </div>
    )
}

export default withRouter(SingleProject)
