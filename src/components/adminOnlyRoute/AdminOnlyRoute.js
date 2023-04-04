import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectEmail } from '../../redux/FeaturesOrSlice/authSlice'


const AdminOnlyRoute = ({children}) => {
  const userEmail = useSelector(selectEmail)
  
  if (userEmail === "lisah@gmail.com"){

    return children
  }
   return (
      <section style={{height: "80vh"}}>
        <div className='constainer'>
          <h2>Permission denied.</h2>
          <p>This Page can Only accessed by the Admin User</p>
          <br/>
          <Link to="/">
            <button className='--btn'>&larr; Back To Home</button>
          </Link> 
        </div>
      </section>
    )
};

// IF LOGGED AS NON ADMIN

export const AdminOnlyLink = ({children}) => {
  const userEmail = useSelector(selectEmail)
  
  if (userEmail === "lisah@gmail.com"){
    return children
   
  }
  return null
}


export default AdminOnlyRoute




