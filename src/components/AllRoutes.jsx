import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'
import SingleProductPage from '../pages/SingleProductPage'
import CartPage from '../pages/CartPage'
import OrderPage from '../pages/OrderPage'
import Register from '../pages/Resgister'
import Login from '../pages/Login'
import Checkout from '../pages/Checkout'
import Success from '../pages/Success'
import PrivateRoute from './PrivateRoute'
import VerifyEmail from '../pages/VeirifyEmail'
import ForgetPasswordMail from '../pages/ForgetPasswordMail'
import ResetPassword from '../pages/ResetPassword'
import Admin from '../pages/Admin'
import AddNewAdmin from '../pages/AddNewAdmin'
import OrdersAdmin from '../pages/OrdersAdmin'
import UsersAdmin from '../pages/UsersAdmin'
import PrivateRouteAdmin from './PrivateRouteAdmin'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import AllContactAdmin from '../pages/AllContactAdmin'
import ForgetPassword from '../pages/ForgetPassword'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/forget_password' element={<ForgetPassword/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/register/verify_email' element={<VerifyEmail/>}/>
        <Route path='/login/reset_password_mail' element={<ForgetPasswordMail/>}/>
        <Route path='/login/reset_password' element={<ResetPassword/>}/>
        <Route path="/products_page" element={<Product/>}/>
        <Route path='/products_page/:id' element={<SingleProductPage/>}/>
        <Route path='/cart_page' element={<PrivateRoute><CartPage/></PrivateRoute>}/>
        <Route path='/order page' element={<PrivateRoute><OrderPage/></PrivateRoute>}/>
        <Route path='/checkout'   element={<PrivateRoute><Checkout/></PrivateRoute>}/>
        <Route path='/success' element={<PrivateRoute><Success/></PrivateRoute>}/> 
        <Route path='/admin' element={<PrivateRouteAdmin><Admin/></PrivateRouteAdmin>}/>
        <Route path="/admin/addnew" element={<PrivateRouteAdmin><AddNewAdmin/></PrivateRouteAdmin>}/>
        <Route path="/admin/orders" element={<PrivateRouteAdmin><OrdersAdmin/></PrivateRouteAdmin>}/>
        <Route path="/admin/createAdmin" element={<PrivateRouteAdmin><UsersAdmin/></PrivateRouteAdmin>}/>
        <Route path="/admin/contactsForm" element={<PrivateRouteAdmin><AllContactAdmin/></PrivateRouteAdmin>}/>
    
    </Routes>
  )
}

export default AllRoutes