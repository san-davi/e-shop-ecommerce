import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserID, selectUserName } from '../../redux/FeaturesOrSlice/authSlice'
import { selectProducts } from '../../redux/FeaturesOrSlice/productSlice'
import Card from '../card/Card'
import styles from "./ReviewProducts.module.scss"
import StarsRating from 'react-star-rate';
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import useFetchDocument from '../../customHooks/useFetchDocument'
import spinnerImg from "../../assets/spinner.gif"


const ReviewProducts = () => {
  const [rate, setRate] = useState(0)
  const [review, setReview]  = useState("")
  const [product, setProduct]  = useState(null)
  const {id} = useParams()
  const {document} = useFetchDocument("products", id)

  const products = useSelector(selectProducts)
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)
useEffect(()=>{
  setProduct(document)

},[document])
  const submitReview = (e)=>{
    e.preventDefault()
    // console.log(rate, review)
    const today = new Date();
    const date = today.toDateString();
    // const time = today.toLocaleTimeString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      // dispatch(CLEAR_CART());
      toast.success("Review Submitted Successfully");
      // navigate("/checkout-success");
      setReview("")
    } catch (error) {
      toast.error(error.message);
    }

  }

  return <section>
    <div className={`container ${styles.review}`}>
      <h2>Review Product</h2>
      {product === null ? (
        <img src={spinnerImg} alt="Loading..." style={{width: "50px"}}/>
      ) : (
        <>
         <p>
        <b>Product Name: </b>{product.name}
      </p>
      <img src={product.imageURL} alt={product.name} style={{width: "100px"}}/>
        </>
       
      )}
      
      <Card cardClass={styles.card}>
        <form onSubmit={(e)=> submitReview(e)}>
          <label>Rating:</label>
          <StarsRating
          value={rate}
          onChange={rate => {
          setRate(rate);
          }}
        />

        <label>Review</label>
        <textarea value={review} required onChange={(e)=>setReview(e.target.value)} cols="30" row="10">

        </textarea>
        <button type='submit' className='--btn --btn-primary'>Submit Review</button>
        </form>
      </Card>
      <br/>
       <div>
        <Link to="/order-history">&larr;Back To Orders</Link>
      </div>
      <br/>
      <div>
        <button className='--btn --btn-primary'>
          <Link to="/">Back To Shop</Link>
        </button>
        
      </div>
    </div>
  </section>
}

export default ReviewProducts