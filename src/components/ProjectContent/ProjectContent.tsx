import { useState, FC } from 'react'
import { project } from '../../redux/singleProject/singleProjectActionTypes'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import './ProjectContent.css'

type projectContentProps = {
    singleProject: project,
    projectID: string
}

const ProjectContent: FC<projectContentProps> = ({ singleProject, projectID }) => {

    const CenterView = ({ center }: any) => {
        const map = useMap()
        map.setView(center)
        return null
    }

    const [contentOptions, setContentOptions] = useState({
        about: true,
        organization: false,
        donations: false,
        location: false
    })

    const [resetOptions, setResetOptions] = useState({
        about: false,
        organization: false,
        donations: false,
        location: false
    })

    const handleChangeOption = (e: any) => {
        const name = e.target.name

        setContentOptions({
            about: false,
            organization: false,
            donations: false,
            location: false,
        })

        setContentOptions({
            ...resetOptions,
            [name]: true
        })
    }


    return (
        <div className="project-content">
            <div className="project-content__btns">
                <button onClick={(e) => handleChangeOption(e)} name="about" className={`${contentOptions.about && 'active'}`}>ABOUT</button>
                <button onClick={(e) => handleChangeOption(e)} name="donations" className={`${contentOptions.donations && 'active'}`}>DONATION OPTIONS</button>
                <button onClick={(e) => handleChangeOption(e)} name="organization" className={`${contentOptions.organization && 'active'}`}>ORGANIZATION</button>
                <button onClick={(e) => handleChangeOption(e)} name="location" className={`${contentOptions.location && 'active'}`}>LOCATION</button>
            </div>
            <div className="project-content__wrapper">
                {contentOptions.about &&
                    <div className="about">
                        {singleProject.summary &&
                            <div className="text-cnt">
                                <h3>Summary</h3>
                                <p>{singleProject.summary}</p>
                            </div>
                        }
                        {singleProject.need &&
                            <div className="text-cnt">
                                <h3>Our need</h3>
                                <p>{singleProject.need}</p>
                            </div>
                        }
                        {singleProject.longTermImpact &&
                            <div className="text-cnt">
                                <h3>Long term impact</h3>
                                <p>{singleProject.longTermImpact}</p>
                            </div>
                        }
                    </div>
                }
                {contentOptions.donations &&
                    <div className="donations">
                        {singleProject.donationOptions.map((item, index) => {
                            return (<div key={index} className="donations__item">
                                <h3>${item.amount}</h3>
                                <p>{item.description}</p>
                            </div>)
                        })}
                    </div>
                }
                {contentOptions.organization &&
                    <div className="organization">
                        {
                            <>
                                <a href={`/organization/${singleProject.projectOrganization.id}`} className="organization__name">{singleProject.projectOrganization.name}</a>
                                <p className="organization__country">{singleProject.projectOrganization.country}</p>
                                <img className="organization__logo" src={singleProject.projectOrganization.logoUrl} alt="organization-logo" />
                                <button className="organization__btn-link">
                                    <a href={`/organization/${singleProject.projectOrganization.id}`}>
                                        GO TO ORGANIZATION
                                </a>
                                </button>
                                <p className="organization__mission">{singleProject.projectOrganization.mission}</p>
                            </>
                        }
                    </div>
                }
                {contentOptions.location &&
                    <>
                        {singleProject.latitude && singleProject.longitude ? <div className="location">
                            <MapContainer className="location__map" center={[singleProject.latitude, singleProject.longitude]} zoom={13} scrollWheelZoom={false}>
                                <CenterView center={[singleProject.latitude, singleProject.longitude]} />
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[singleProject.latitude, singleProject.longitude]}>
                                    <Popup>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                            :
                            <div className="location-error">
                                There is no location available for this project, Sorry!
                    </div>}
                    </>
                }
            </div>
        </div>
    )
}

export default ProjectContent
