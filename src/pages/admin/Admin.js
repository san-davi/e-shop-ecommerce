import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../../components/Admin/Navbar/NavBar'
import styles from "./Admin.module.scss"

import ViewProduct from '../../components/Admin/viewproduct/ViewProduct'
import AddProduct from '../../components/Admin/addProduct/AddProduct'
import Orders from '../../components/Admin/Orders/Orders'
import Home from '../../components/Admin/Home/Home'
import OrderDetails from '../../components/Admin/orderDetails/OrderDetails'
// import OrderDetails from '../orderDetails/OrderDetails'


const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home/>}/>
          <Route path="all-products" element={<ViewProduct/>}/>
          <Route path="add-product/:id" element={<AddProduct/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="order-details/:id" element={<OrderDetails/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default Admin
