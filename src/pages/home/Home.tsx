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
            id: 1, icon: <RiHandHeartLine />, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime incidunt totam voluptatibus animi officiis ad, qui repellendus voluptas inventore velit voluptate repellat veritatis porro, explicabo sint quaerat maiores? Soluta, omnis.'
        },
        {
            id: 2, icon: <AiOutlineFileSearch />, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime incidunt totam voluptatibus animi officiis ad, qui repellendus voluptas inventore velit voluptate repellat veritatis porro, explicabo sint quaerat maiores? Soluta, omnis.'
        },
        {
            id: 3, icon: <CgSmile />, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime incidunt totam voluptatibus animi officiis ad, qui repellendus voluptas inventore velit voluptate repellat veritatis porro, explicabo sint quaerat maiores? Soluta, omnis.'
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
                            summary: item.summary
                        }
                    })
                )
            })
        const startCarousel: any = () => {
            setTimeout(() => {
                setStartingSlide(1)
            }, 5000)
        }

        startCarousel()

    }, [])


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
                                    <p>
                                        {item.summary.slice(0, 350) + "..."}
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
        </div>
    )
}

export default Home
