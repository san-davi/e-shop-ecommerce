import React from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.jpg"
import {Link} from "react-router-dom"
import {FaGoogle} from "react-icons/fa"
import Card from '../../components/card/Card'
import { useState } from 'react'
import {  signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
// LOGIN WITH GOOGLE
import { GoogleAuthProvider } from "firebase/auth";
import { useSelector } from 'react-redux'
import { selectPreviousURL } from '../../redux/FeaturesOrSlice/cartSlice'


const Login = () => {
  // LOGIN STATE
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const previousURL = useSelector(selectPreviousURL)
  const navigate = useNavigate()
  const redirectUser =()=>{
    if(previousURL.includes("cart")){
      return navigate("/cart")

    }
    navigate("/")
  }

  const [isLoading, setIsLoading] = useState(false)
  

  // loginFUNCTION IN SUBMIIT
  const loginUser = (e)=>{
    e.preventDefault()
    setIsLoading(true)
    // console.log(email, password)
    // FROM FIRABASE 
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    setIsLoading(false)
    toast.success("Login Successfull")
    // navigate('/')
    redirectUser()
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    toast.error(error.message)
    setIsLoading(false)
  });
    
  }

  // LOGIN WITH GOOGLE
  const provider = new GoogleAuthProvider();
  const signInWithGoogle =()=>{

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    toast.success("Login Successfully.")
    // navigate('/')
    redirectUser()
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    toast.error(error.message)
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    


  }



  return (
    <>
    {/* FOR LOADER */}
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login"/>
      </div>

      <Card>
      <div className={styles.form}>
        <h2>Login</h2>
       
        <form onSubmit={loginUser}>
          <input type="text" 
          placeholder="Email" 
          required value={email} 
          onChange={(e)=>
          setEmail(e.target.value)}/>

          <input type="password" 
          placeholder="Password" 
          required value={password} 
          onChange={(e)=> 
          setPassword(e.target.value)}/>

          <button className="--btn --btn-primary --btn-block" type='submit'>Login</button>

          <div className={styles.links}>
            <Link to="/reset"><h5>Reset Password</h5></Link>
          </div>
        </form>
            <button className="--btn --btn-dangerred --btn-block" onClick={signInWithGoogle}><FaGoogle color="#fff"/>Login with Google</button>
            <span className={styles.register}>
              <Link to="/register"></Link>
              <p>Don't have an account?</p>
              <Link to="/register"><h4>Register</h4></Link>.
            </span>
      </div>
      </Card>
    </section>
    </>
    
  )
}

export default Login
