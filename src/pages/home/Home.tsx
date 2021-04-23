import React from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import "./Home.css"

const Home = () => {
    return (
        <div className="home">
            <section className="home__carousel-wrapper">
                <Carousel
                    className="home__carousel"
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={10000}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                >
                    <div>
                        <img src="1.jpg" alt="sdsdd" />
                    </div>
                    <div>
                        <img src="2.jpg" alt="sdsds" />
                    </div>
                </Carousel>
            </section>
        </div>
    )
}

export default Home
