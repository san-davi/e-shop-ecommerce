import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/FeaturesOrSlice/authSlice'



const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(isLoggedIn){
        return children
    }
    return null
}

// LOG OUT
export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(!isLoggedIn){
        return children
    }
    return null
}

export default ShowOnLogin
