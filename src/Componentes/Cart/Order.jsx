import axios from 'axios';
import React, { useState } from 'react'
import { Slide, toast, Zoom } from 'react-toastify';
import { object, string } from 'yup';
import './Order.css'
import { useNavigate } from 'react-router-dom';
export default function Order() {
  const [errors , setErrors ] = useState([]);
  const navigate = useNavigate();
  const [order,setOrder] = useState({
    couponName : '',
    address :'',
    phone :''
});
  
  const handleChange = (e)=>{
    const {name , value} = e.target;
    setOrder({
      ...order,
      [name] :value,
    });
    
  };

  const validateOrder = async ()=>{
    const validationScema = object({
      couponName : string(),
      address : string().min(3).max(20).required(),
      phone : string().min(3).max(20).required(),
    })
    try{
      await validationScema.validate(order, {abortEarly:false})
      return true;
    }catch(error){
      console.log('validation error',error.errors);
      setErrors(error.errors);
      return false;
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const isValid = await validateOrder();
    if (!isValid){
      console.log('Form validation failed');
      return;
    }
    try{
      const {data} = await axios.post(`${import.meta.env.VITE_API}order`,
        {
          couponName : order.couponName,
          address : order.address,
          phone : order.phone,
        },
        {
          headers:{
            Authorization : `Tariq__${localStorage.getItem('userToken')}`
          }
        }
      );
      if (data.message === 'success') {
        toast.success('order done Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
          });
          setOrder({
            couponName : '',
            address :'',
            phone :''
          });
      }
      navigate('/')
    }catch(error){
      
      toast.error(error.response.data.message , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        });
    }
  };

  return (
    <>
    <div className='order'>
      <h2>ORDER</h2>
      <img src='src/assets/home.png' className='w-50 p-3'/>
      <form onSubmit={handleSubmit}>
        <input type='text' value={order.couponName} onChange={handleChange} className='form-control' placeholder='coupon Name' name='couponName'/>
        <input type='text' value={order.address} onChange={handleChange} className='form-control'placeholder='address' name='address'/>
        <input type='text' value={order.phone} onChange={handleChange} className='form-control' placeholder='phone' name='phone'/>
        <button type='submit' className='btn btn-warning'>order</button>
      </form>
    </div>
      
    </>
  )
}
