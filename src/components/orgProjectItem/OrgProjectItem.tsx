import { FC } from 'react'

import { Link } from 'react-router-dom'

import './OrgProjectItem.css'

type ProjectProps = {
    project: any
}

const OrgProjectItem: FC<ProjectProps> = ({ project }) => {

    const { title, image, funding, goal, numberOfDonations } = project

    console.log()

    return (
        <Link className="org-project-link" to={`/project/${project.id}`}>
            <div className="org-project">
                <div className="org-project__img-cnt">
                    <img src={image.imagelink[5].url} alt={`${title}`} />
                </div>
                <div className="org-project__content">
                    <h4 className="title">{title.length > 70 ? `${title.slice(0, 70)}...` : title}</h4>
                    <div className="goal">
                        <div className="goal__progress-bar">
                            <p className="goal__progress-bar-total">
                                {`($${funding} of $${goal})`}
                            </p>
                            <div className="goal__progress-bar-full" style={{ width: `${(funding / goal) * 100}%` }}>
                            </div>
                        </div>
                        <p className="goal__procentage">{((funding / goal) * 100).toFixed(0)}% of ${goal} and {numberOfDonations} donations.</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrgProjectItem
