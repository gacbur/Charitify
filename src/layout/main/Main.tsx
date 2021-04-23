import React from 'react'

import { Route } from 'react-router-dom'

import Home from '../../pages/home/Home'

const Main = () => {
    return (
        <>
            <Route exact path="/" component={Home} />
        </>
    )
}

export default Main
