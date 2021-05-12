import { FC, useEffect, useState } from 'react'

import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

import { RouteComponentProps, withRouter } from 'react-router';

import { RootStore } from '../../redux/Store'
import { getSingleOrganization, singleOrganizationLoading, singleOrganizationError } from '../../redux/singleOrganization/singleOrganizatonActions';

import Loading from '../../components/loading/Loading'
import OrgProjectItem from '../../components/orgProjectItem/OrgProjectItem'

import useFetchOrgProjects from '../../hooks/useFetchOrgProjects';

import './SingleOrganization.css'

type SingleOrganizationParams = {
    id: string
}

type SingleOrganizationProps = RouteComponentProps<SingleOrganizationParams>

const SingleOrganization: FC<SingleOrganizationProps> = ({ match }) => {


    const [showMoreMission, setShowMoreMission] = useState<boolean>(false)

    const dispatch = useDispatch()

    const organizationLoading = useSelector((state: RootStore) => state.singleOrganization.loading)
    const organizationError = useSelector((state: RootStore) => state.singleOrganization.error)
    const Organization = useSelector((state: RootStore) => state.singleOrganization.organization)

    const [organizationProjects, setOrganizationProjects] = useState<any>([])
    const [nextId, setNextId] = useState('')
    const [loadMore, setLoadMore] = useState(0)

    useEffect(() => {
        dispatch(singleOrganizationLoading(true))
        axios.get(`https://api.globalgiving.org/api/public/projectservice/organizations/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.data.organization)
            .then(organization => {
                dispatch(singleOrganizationLoading(false))
                dispatch(getSingleOrganization({
                    id: organization.id,
                    name: organization.name,
                    addressLine1: organization.addressLine1,
                    addressLine2: organization.addressLine2,
                    country: organization.country,
                    city: organization.city,
                    state: organization.state,
                    url: organization.url,
                    logoUrl: organization.logoUrl,
                    mission: organization.mission,
                    totalProjects: organization.totalProjects,
                    activeProjects: organization.activeProjects,
                }))
            })
            .catch(() => {
                dispatch(singleOrganizationLoading(false))
                dispatch(singleOrganizationError(true))
            })
    }, [match.params.id])

    const { projectsLoading, projectsError } = useFetchOrgProjects(
        match.params.id,
        organizationProjects,
        setOrganizationProjects,
        setNextId,
        nextId,
        loadMore,
    )

    useEffect(() => {
        console.log(organizationProjects)
    }, [organizationProjects])

    const handleLoadMoreProjects = () => {
        setLoadMore(prevState => prevState + 1)
    }

    return (
        <div className="single-organization">
            { organizationLoading && <div className="single-organization__loading">
                <Loading />
            </div>}
            { organizationError && <div className="single-organization__error">
                Sorry we couldn't get the organization info, refresh the page!
            </div>}
            { Organization && <div className="single-organization__header">
                <div className="header">
                    <div className="header__main-content">
                        <div className="header__image">
                            <img src={Organization.logoUrl} alt={`${Organization.name} logo`} />
                        </div>
                        <div className="header__text">
                            <h3 className="name">{Organization.name}</h3>
                            {Organization.state !== '' && <h4 className="state">{Organization.state}</h4>}
                            <h4 className="country">{Organization.city}</h4>
                            <p className="address1">{Organization.addressLine1}</p>
                            <p className="address2">{Organization.addressLine2}</p>
                        </div>
                    </div>
                    <div className="header__mission">
                        <hr className="separator" />
                        <h2 className="mission-title">Our mission</h2>
                        <p className="mission-text">{showMoreMission ? Organization.mission : Organization.mission.slice(0, 1500) + "..."}
                            {!showMoreMission && Organization.mission.length > 1500 && <span
                                className="show-more"
                                onClick={() => setShowMoreMission(true)}
                            >
                                Show more...
                            </span>}
                        </p>
                    </div>
                </div>
            </div>
            }
            <hr className="single-organization__main-separator"></hr>
            <div className="single-organization__projects">
                <h3 className="projects-section-title">Organization Projects</h3>
                <div className="projects-wrapper">
                    {organizationProjects.map((project: any) => {
                        return <OrgProjectItem key={project.id} project={project} />
                    })}
                </div>
                <div className="projects-loading">
                    {projectsLoading && <Loading />}
                </div>
                <div className="load-more">
                    <button
                        className="load-more__btn"
                        onClick={() => handleLoadMoreProjects()}
                    >load more</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(SingleOrganization)
