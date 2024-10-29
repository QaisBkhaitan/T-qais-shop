import React from 'react'
import Navbar from '../Pages/Navbar'
import Footer from '../Pages/Footer'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './Root.css'

export default function Root() {
  return (
    <>
    <div className='container homePage'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
      
    </>
  )
}
