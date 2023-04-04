import React, { useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { REMOVE_ACTIVE_USER, selectIsLoggedIn } from '../../redux/FeaturesOrSlice/authSlice'
import { ADD_TO_CART, CALCULATE_SUB_TOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/FeaturesOrSlice/cartSlice'
import styles from "./Cart.module.scss"



const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  const cartTotalAmount = useSelector(selectCartTotalAmount)

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const increaseCart = (cart)=>{
    dispatch(ADD_TO_CART(cart));

  }
  const decreaseCart = (cart)=>{
    dispatch(DECREASE_CART(cart))
  }
  const removeFromCart = (cart)=>{
    dispatch(REMOVE_FROM_CART(cart))
  }
  const clearCart =(cart)=>{
    dispatch(CLEAR_CART(cart))

  }

  useEffect(()=>{
    dispatch(CALCULATE_SUB_TOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(SAVE_URL(""))

  }, [dispatch, cartItems])

  const url = window.location.href;
  
  const checkout=()=>{
    if(isLoggedIn){
      navigate("/checkout-details")
      

    } else{
      dispatch(SAVE_URL(url))
      navigate("/login")
    }

  }
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping List</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your Shopping List is Now Empty.</p>
            <br/>
            <div>
              <button className="--btn --btn-primary">
              <Link to="/#products">Go To Shop Now</Link>
              </button>
            </div>
          </>
          
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>

            </thead>
            <tbody>
              {cartItems.map((cart, index) =>{
                const {id, name, price, imageURL, cartQuantity} = cart;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{width: "100px"}}/>
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button className="--btn" onClick={()=> decreaseCart(cart)}>-</button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button className='--btn' onClick={()=> increaseCart(cart)}>+</button>
                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                    <td className={styles.icons}>
                      <FaTrashAlt size={19} color='red' onClick={()=> removeFromCart(cart)}/>
                    </td>
                  </tr>
                )

              })}

            </tbody>
          </table>
          <div className={styles.summary}>
            <button className="--btn --btn-dangerred" onClick={()=> clearCart()}>Clear Cart</button>
            <div>
                {/* <button className="--btn --btn-primary"> */}
                 
                {/* </button> */}
              </div>
            <div className={styles.checkout}>
              
              <br/>
              <Card cardClass={styles.card}>
                <p><b>{`cart item(s):${cartTotalQuantity}`}</b>
                </p>
                <div className={styles.text}>
                  <h4>Subtotal: </h4>
                  <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                </div>
                <p>Tax on Shipping calculated at checkout</p>
                <button className='--btn --btn-primary --btn-block' onClick={checkout}>Checkout</button>
                <br/>
                <button className="--btn --btn-primary">
                  <Link to="/#products"> Call Seller</Link>
                </button>
                <br/>
                <Link to="/#products"> &larr;Back To Shop</Link>
              </Card>
            </div>
          </div>
          </>
        )}

      </div>
    </section>
  )
}

export default Cart
