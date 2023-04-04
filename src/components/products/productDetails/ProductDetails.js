
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import spinnerImg from '../../../assets/spinner.gif'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/FeaturesOrSlice/cartSlice'
import useFetchDocument from '../../../customHooks/useFetchDocument'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Card from '../../card/Card'
import StarsRating from "react-star-rate"
import { FaPhoneAlt } from 'react-icons/fa'


const ProductDetails = () => {
  const {id} = useParams()
  // console.log(id)

  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cart = cartItems.find((cart)=> cart.id === id)

  const { document } = useFetchDocument("products", id)
  
  const {data} = useFetchCollection("reviews")


  const filteredReviews = data.filter((review)=>review.productID === id)
  const isCartAdded = cartItems.findIndex((cart)=>{
    return cart.id === id


  })
  // GET PRODUCT FROM FIRESTORE(FROM FIRESTORE GET DATA AT ONCE)
 
//   const getProduct = async () => {
//     const docRef = doc(db, "products", id);
//     const docSnap = await getDoc(docRef);
//     // console.log("getting product")
    
    
//     if (docSnap.exists()) {
//       // console.log("Document data:", docSnap.data());
//       // FOR ID 
//       const obj = {
//         id: id,
//         ...docSnap.data()
//       }
//       setProduct(obj)
    
//     } else {
//   // doc.data() will be undefined in this case
//   // console.log("No such document!");
//   toast.error("Product Not Found")
// }
//   }
  useEffect(()=>{
    setProduct(document)
  
  },[document])

  const addToCart =()=>{
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  const decreaseCart =(product)=>{
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  
  

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
       
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{width: "50px"}}/>
        ) : (
          <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product.imageURL} alt={product.name}/>

            </div>
            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>{`$${product.price}`}</p>
              <p>{product.desc}</p>
              <p>
                <b>Brand: </b>{product.brand}
              </p>
              <div className={styles.count}>
                {isCartAdded < 0 ? null : (
                  <>
                   <button className='--btn' onClick={()=> decreaseCart(product)}>-</button>
                <p>
                  <b>{cart.cartQuantity}</b>
                </p>
                <button className='--btn' onClick={()=> addToCart(product)}>+</button>
                  
                  </>
                )}
               

              </div>
              <button className="--btn --btn-danger" onClick={()=> addToCart(product)}>Add To cart</button>

            </div>

          </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>No review Yet</p>
            ) : (
              <>
              {filteredReviews.map((item, index)=>{
                const { rate,review,userName,reviewDate} = item
                return (
                  <div key={index} className={styles.review}>
                    <StarsRating value={rate}/>
                    <p>{review}</p>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <span>
                      <b> by {userName}</b>
                    </span>
                  

                  </div>
                )
              })}
              </>
            )}
          </div>

        </Card>
        <br/>
        <div>
              <button className="--btn">
                <Link to="/#products">&larr; Back To Shop</Link>
              </button>
         
        </div>
        <br/>
        <div>
          <button className='--btn --btn-primary'>
          <FaPhoneAlt />
             <Link to='/contactus'>Call Seller</Link>
          </button>
         
        </div>

      </div>
      
    </section>
  )
}



export default ProductDetails
