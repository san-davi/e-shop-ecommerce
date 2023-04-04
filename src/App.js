import "./App.scss"
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import Home from './pages/home/Home'
// import Header from './components/header/Header'
// import Footer from "./components/footer/Footer";
// import Contact from './pages/contact/Contact'

// COMPONENTS
import {Header, Footer} from './components'
// PAGES
import {Home, Contact,Login,Register,Reset, Admin} from './pages'

// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiAdjustments } from "react-icons/hi";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/products/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
// import OrderDetails from "./admin/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";
// import OrderDetails from "./components/Admin/orderDetails/OrderDetails";
import OrderDetails from "./pages/orderDetails/OrderDetails"



function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contactus" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/reset" element={<Reset/>}/>


      {/* ADMIN ROUE */}
      <Route path="/admin/*" element={< AdminOnlyRoute> <Admin/> </AdminOnlyRoute> }/>
      {/* ====== */}
      
      <Route path="/product-details/:id" element={<ProductDetails/>}/>

      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout-details" element={<CheckoutDetails/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
      <Route path="/admin-orders" element={<OrderDetails/>}/>
      <Route path="/order-history" element={<OrderHistory/>}/>
      <Route path="/order-details/:id" element={<OrderDetails/>} />
      <Route path="/review-product/:id" element={<ReviewProducts/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
