import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/FeaturesOrSlice/cartSlice'
import Card from '../card/Card'
import styles from "./CheckoutSummary.module.scss"

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)


  return (
    <div>
        <h3>Checkout Summary</h3>
        <div>
            {cartItems.length === 0 ? (
                <>
                <p>No Item In Your Cart</p>
                <button className='--btn'>
                    <Link to='/#products'>Back To Shop</Link>
                </button>
                </>
            ) : (
                <div>
                    <p>
                        <b>{`Cart Itmes: ${cartTotalQuantity}`}</b>
                    </p>
                    <div className={styles.text}>
                        <h4>Subtotal: </h4>
                        <h3>{cartTotalAmount.toFixed(2)}</h3>
                    </div>
                        {cartItems.map((item, index)=> {
                            const {id, name, price, cartQuantity} = item

                            return (
                                <Card cardClass={styles.card}>
                                    <h4>Product {index + 1}: {name}</h4>
                                    <p>Quantity: {cartQuantity}</p>
                                    <p>Unity: {price}</p>
                                    <p>Set Price: {price * cartQuantity}</p>
                                    
                                </Card>
                            )
                        })}
                        
                    
                </div>
            )}
        </div>
      
    </div>
  )
}

export default CheckoutSummary
