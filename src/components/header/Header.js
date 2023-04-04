import React, { useEffect } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink } from 'react-router-dom'
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa"
import {HiOutlineMenuAlt3} from "react-icons/hi"
import { useState } from 'react'
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/FeaturesOrSlice/authSlice'
import { REMOVE_ACTIVE_USER } from '../../redux/FeaturesOrSlice/authSlice'
import { ShowOnLogout } from '../hidenLink/HidenLink'
import ShowOnLogin from '../hidenLink/HidenLink'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
// import AdminOnlyRoute from '../adminOnlyRoute/AdminOnlyRoute'
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/FeaturesOrSlice/cartSlice'





const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        San<span>Shop</span>.
      </h2>
    </Link>
  </div>
)




// is Active
const activeLink = ({isActive})=> 
(isActive ? `${styles.active}`:"")


// MENU FUNCTIONALITY(SHOW,HIDE )
const Header = () =>{
  const [ showMenu, setShowMenu] = useState(false)
  const [displayName, setDisplayName] = useState("")

  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  useEffect (()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY)
  }, [])

  const [scrollPage, setScrollPage] = useState(false)

  const fixNavbar = ()=>{
    if(window.scrollY > 50){
      setScrollPage(true)
    } else{
      setScrollPage(false)
    }
    
  }
  window.addEventListener("scroll", fixNavbar)


  // REDUX
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu =()=>{
    setShowMenu(false)
  }
const navigate = useNavigate()

  // lOGOUT FUNCTION 
  const logoutUser =()=>{
    signOut(auth).then(() => {
      toast.success("Logout Successfully")
      navigate('/login')
      // Sign-out successful.
    }).catch((error) => {
      toast.error(error.message)
      // An error happened.
    });

  }


// ONAUTH USER/MONITOR SIGNED IN USER
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // console.log(user.displayName)
      
      // console.log(user)


      // SLICING USERNAME FROM EMAIL
      if(user.displayName == null){
        // FOR MAIL
        // const u1 = user.email.slice(0, -10);

        // FOR YAHOO AND G EMAIL
        const u1 = user.email.substring(0, user.email.indexOf("@"));
        // MAKING FIRST LETTER TO BE CAPITAL
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
        // console.log(uName)
        setDisplayName(uName)

      }else{
        setDisplayName(user.displayName)

      }

// PUSHING and SAVE INFO FROM FIREBASE TO HAVE IT IN REDUXSTORE
      dispatch(SET_ACTIVE_USER({
        email: user.email,
        userName: user.displayName ? user.displayName : displayName,
        userID: user.uid
      }))

      // 
      // ...
    } else {
      setDisplayName("")
      dispatch(REMOVE_ACTIVE_USER())
      // User is signed out
      // ...
    }
  });
  // TO AVOID WARNING
}, [dispatch, displayName])

const cart = (
  <span className={styles.cart}>
  <Link to='/cart'>
    Cart 
  <FaShoppingCart size={20}/>
  <p>{cartTotalQuantity}</p>
  </Link>
</span>

)

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}`
        :`${styles["hide-nav"]}`}>

          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
          : `${styles["nav-wrapper"]}`} onClick={hideMenu}>

          </div>

       
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu}/>
              </li>
              {/* ADMIN BUTON */}
              <li>
                
                  <AdminOnlyLink>
                    <Link to="/admin/home">
                   <button className="--btn --btn-primary">Dashboard</button>
                 </Link>  
                </AdminOnlyLink>
                
                
              </li>
              <li>
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
              
              <li>
              <NavLink to="/contactus" className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>

              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href='#' style={{ color: "rgb(24, 201, 224)"}}><FaUserCircle size={16}/>Hi {displayName}</a>
              </ShowOnLogin>
              

              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              </ShowOnLogin>

              {/* TO CHANGE LOGIN IN AND OUT */}
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>LogOut</NavLink>
              </ShowOnLogin>
           
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>

        </div>
      </div>
     
    </header>
    
  )
}

export default Header
