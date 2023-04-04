import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'

const CheckoutSuccess = () => {
  return (
    <section>
      {/* <Card cardClass={styles.card}> */}
        <div className='container'>
        <h2>Checkout successful</h2>
        <p>Thank You For your Purchase</p>
        <br/>
        
          <button className='--btn --btn-primary'>
            <Link to="/order-history">
              View Order Status
            </Link>
            </button>
        
      </div>
      {/* </Card> */}
      
    </section>
  )
}

export default CheckoutSuccess
