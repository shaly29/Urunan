
import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'

import Home from './components/Home';
import Header from './components/Header';

import PartsForm from './pages/PartsForm';
import AllProducts from './pages/Product/AllProducts';
import ProductDetails from './pages/Product/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/Profile'
import User from './components/Admin/User';
import Faq from './pages/Faq';
import PartsList from './components/Admin/PartsList';
import AdminApp from './components/Admin/AdminApp';
import Shipping from './pages/cart/Shipping';
// import AdminRoutes from './components/Admin/AdminRoutes';
import ProductForm from './components/Admin/ProductForm';
import ProductList from './components/Admin/ProductList';
import Scan from './Scan';
import Blog from './pages/Blog';
import About from './pages/About';
import ContactForm from './pages/Contact';

import CheckoutSteps from './pages/cart/CheckoutStep';
import { useEffect } from "react";
import UserOrders from './pages/order/UserOrders';
import OrderList from './components/Admin/OrderList';
import ProductReview from './pages/Product/productReview';
import ReviewForm from './pages/Product/ReviewForm';


// import AdminApp from './components/Admin/AdminApp';
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
 

  useEffect(() => {
    // Check if the current route is an admin route
    setIsAdminRoute(window.location.pathname.startsWith('/admin'));
  }, []);

 


  return (
    <>
   
    <Router>
      <ToastContainer theme='dark' />
    
     {!isAdminRoute && <Header cartItems={cartItems} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/partsform' element={<PartsForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/allproducts' element={<AllProducts />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/viewdetails/:id' element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/checkout' element={<CheckoutSteps />} />
        <Route path='/scan' element={<Scan/>}/>
        <Route path='/review' element={<ReviewForm/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/contact' element={<ContactForm/>}/>
         <Route path='/productreview' element={<ProductReview/>}/>
         <Route path='/userorders' element={<UserOrders/>} />
        {/* <Route path="/admin/*" element={<AdminRoutes><AdminApp/></AdminRoutes>} /> */}
        <Route path="/admin/" element={<AdminApp />} />
        <Route path='/admin/productlist' element={<ProductList />} />
        <Route path='/admin/users' element={<User />} />
        <Route path='/admin/productform' element={<ProductForm />} />
        <Route path='/admin/parts' element={<PartsList />} />
        <Route path='/admin/order' element={<OrderList/>} />
      </Routes>

     
      </Router>
      I 
    </>
  );
}

export default App;
