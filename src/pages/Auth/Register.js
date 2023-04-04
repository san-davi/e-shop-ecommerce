import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.jpg'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'


import {createUserWithEmailAndPassword} from "firebase/auth"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from "../../firebase/config"
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'




const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading ] = useState(false)


  const navigate = useNavigate()

  const registerUser =(e)=>{
    // TO AVOID RELOAD PAGE
    e.preventDefault();
    if (password !== cPassword){
      toast.error("Password do not Match")

    }
    setIsLoading(true)


// CREATE USER WITH PASSWORD FROM FIREBASE
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false)
    toast.success("Registered Successfully!...")
    navigate('/login')
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
    toast.error(error.message)
    setIsLoading(false)
  });
    // console.log(email, password,cPassword)
  }




  return (
    <>
    {/* FOR TOASTIFY */}
    <ToastContainer/>
    {isLoading && <Loader/>}

    <section className={`container ${styles.auth}`}>
      <Card>
      <div className={styles.form}>
        <h2>Register</h2>

        <form onSubmit={registerUser}>
          <input type="text"
           placeholder="Email"
            required value={email}
             onChange={(e)=> setEmail(e.target.value)}/>

          <input type="password" 
          placeholder="Password" 
          required value={password} 
          onChange={(e)=> setPassword(e.target.value)}/>


          <input type="password" 
          placeholder="Comfirm Password" 
          required value={cPassword} 
          onChange={(e)=> setCPassword(e.target.value)}/>


          <button className="--btn --btn-primary --btn-block" type='submit'>Register</button>
        </form>
        <form>
            <span className={styles.register}>
              <Link to="/register"></Link>
              <p>Already have an account?</p>
              <Link to="/login"><h4>Login</h4></Link>.
            </span>
          </form>

      </div>
      </Card>
      <div className={styles.img}>
        <img src={loginImg} alt="register" width="400"/>
      </div>
    </section>
    </>
  )
}


export default Register
