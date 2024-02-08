import React from 'react'
import { isAuthenticate } from '../../auth/auth'
import { Navigate, Outlet } from 'react-router-dom'

const SecureRoute = () => { 

    if(isAuthenticate()) {
        return <Outlet/>;
    } else {
        return <Navigate to={'/login'}/>;
    }
}

export default SecureRoute
