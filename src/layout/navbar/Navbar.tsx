import { Link } from 'react-router-dom'

import { IoIosArrowUp } from 'react-icons/io'

import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__items">
                <div className="navbar__logo">
                    <Link to="/">Charitify.</Link>
                </div>
                <ul className="navbar__links">
                    <div className="navbar__links__normal">
                        <li><Link to="/">Home</Link></li>
                    </div>
                    <div className="navbar__links__dropdown">
                        <li className="dropdown">
                            Explore
                            <IoIosArrowUp className="dropdown-icon" />
                            <ul className="links">
                                <li className="link">
                                    <Link to="/projects">
                                        Projects
                                </Link>
                                </li>
                                <li className="link">
                                    <Link to="/organizations">
                                        Organizations
                                </Link>
                                </li>
                            </ul>
                        </li>
                    </div>
                    <div className="navbar__links__dropdown">
                        <li className="dropdown">
                            Followed
                            <IoIosArrowUp className="dropdown-icon" />
                            <ul className="links">
                                <li className="link">
                                    <Link to="/projects">
                                        Projects
                                </Link>
                                </li>
                                <li className="link">
                                    <Link to="/organizations">
                                        Organizations
                                </Link>
                                </li>
                            </ul>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
