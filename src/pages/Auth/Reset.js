import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.jpg'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import Loader from '../../components/loader/Loader'

// RESET PASSWORD
const Reset = () => {
  const[email, setEmail] = useState("")
  const[isLoading, setIsLoading] = useState(false)

  const resetPassword=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    // alert(email)

    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success("Chech Your email for a Reset Link.")
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
    
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
  });
  }

  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Reset Password" width="400"/>
      </div>

      <Card>
      <div className={styles.form}>
        <h2>Reset Password</h2>
       
        <form onSubmit={resetPassword}>
          <input type="text" 
          placeholder="Email" 
          required value={email} 
          onChange={(e)=>setEmail(e.target.value)}/>
          <button className="--btn --btn-primary --btn-block" type='submit'>Reset Password</button>

          <div className={styles.links}>
            <p><Link to="/login"><h4>Login</h4></Link></p>
            <p><Link to="/register"><h4>Register</h4></Link></p>
            
          </div>
        </form>
      </div>
      </Card>
    </section>
    </>
  )
}

export default Reset
