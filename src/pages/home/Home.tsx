import React, { useState, useEffect } from 'react'

import axios from 'axios'

import "react-responsive-carousel/lib/styles/carousel.min.css";
//@ts-ignore
import { Carousel } from 'react-responsive-carousel';

import { RiHandHeartLine } from 'react-icons/ri'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { CgSmile } from 'react-icons/cg'

import "./Home.css"

const Home = () => {

    const aboutUsItems = [
        {
            id: 1, icon: <RiHandHeartLine />, text: 'We Charitify are an organization that helps you search for all kinds of charities, organizations and people that you would like to support with donating.'
        },
        {
            id: 2, icon: <AiOutlineFileSearch />, text: 'We offer you a wide range of projects you can search for, you would like to support and donate! '
        },
        {
            id: 3, icon: <CgSmile />, text: 'Our mission is to make helping people easy and accessible. There is nothing more fullfiling than helping others in need, and achive their dreams. “The greatest use of a life is to spend it on something that will outlast it.” William James. '
        },


    ]

    const [slides, setSlides] = useState<any>([])
    const [startingSlide, setStartingSlide] = useState<number>(0)

    useEffect(() => {
        axios.get(`https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                console.log(res.data.projects.project)
                setSlides(
                    res.data.projects.project.map((item: any) => {
                        return {
                            id: item.id,
                            image: item.image.imagelink[4].url,
                            title: item.title,
                            summary: item.summary,
                            funding: item.funding,
                            goal: item.goal
                        }
                    })
                )
            })
    }, [])

    useEffect(() => {
        const startCarousel: any = () => {
            setTimeout(() => {
                setStartingSlide(1)
            }, 5000)
        }

        if (slides.length > 0) {
            startCarousel()
        }
    }, [slides])


    return (
        <div className="home">
            <section className="home__carousel-wrapper">
                <Carousel
                    className="home__carousel"
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    showArrows={false}
                    selectedItem={startingSlide}
                    showStatus={false}
                    showThumbs={false}
                    stopOnHover
                >
                    {slides.map((item: any) => {
                        return (
                            <div className="carousel__item-cnt" key={item.id}>
                                <div className="carousel__item" style={{ backgroundImage: `url(${item.image})` }}>
                                </div>
                                <div className="img-overlay">
                                    <h2>
                                        {item.title}
                                    </h2>
                                    <div className="img-overlay__goal">
                                        <div className="progress-bar">
                                            <p className="progress-bar__total">
                                                {`($${item.funding} of $${item.goal})`}
                                            </p>
                                            <div className="progress-bar-full" style={{ width: `${(item.funding / item.goal) * 100}%` }}>
                                            </div>
                                        </div>
                                        <p className="procentage">{((item.funding / item.goal) * 100).toFixed(0)}%</p>
                                    </div>
                                    <p>
                                        {item.summary.slice(0, 230) + "..."}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>
            </section>
            <section className="home__about-us">
                <h2>About us</h2>
                <div className="about-us__items-cnt">
                    {aboutUsItems.map((item: any) => {
                        return (
                            <div key={item.id} className="about-us__item">
                                <i>{item.icon}</i>
                                <p>{item.text}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className="home__explore">
                <h2>Explore</h2>
                <div className="home__explore__btns-cnt">
                    <button className="home__explore__btn">
                        Projects
                    </button>
                    <button className="home__explore__btn">
                        Organizations
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Home
