import React, { useContext, useEffect } from 'react'
import { Navigate, Route ,Outlet} from 'react-router-dom'
import { getCookieFromBrowser } from '../../../utils/cookie'




const PrivateRoute = () => {

    let isLoggedIn = getCookieFromBrowser('a')

    return (       
            isLoggedIn ? <Outlet/> : <Navigate to="/sign-in" />       
    )
}

export default PrivateRoute