import React from 'react'

import { Route } from 'react-router-dom'

import Home from '../../pages/home/Home'
import SingleProject from '../../pages/singleProject/SingleProject'

const Main = () => {
    return (
        <>
            <Route exact path="/" component={Home} />
            <Route path="/project/:id" component={SingleProject} />
        </>
    )
}

export default Main
