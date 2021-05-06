import { useState, FC } from 'react'
import { project } from '../../redux/singleProject/singleProjectActionTypes'

import './ProjectContent.css'

type projectContentProps = {
    singleProject: project
}

const ProjectContent: FC<projectContentProps> = ({ singleProject }) => {

    const [contentOptions, setContentOptions] = useState({
        about: true,
        organization: false,
        donations: false,
        location: false
    })

    const resetOptions = {
        about: false,
        organization: false,
        donations: false,
        location: false
    }

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
                                <h4 className="organization__name">{singleProject.projectOrganization.name}</h4>
                                <p className="organization__country">{singleProject.projectOrganization.country}</p>
                                <img className="organization__logo" src={singleProject.projectOrganization.logoUrl} alt="organization-logo" />
                                <p className="organization__mission">{singleProject.projectOrganization.mission}</p>
                            </>
                        }
                    </div>
                }
                {contentOptions.location &&
                    <div className="location">
                        location
                    </div>
                }
            </div>
        </div>
    )
}

export default ProjectContent
