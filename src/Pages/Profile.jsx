import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    const getProfile = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}user/profile`, {
              headers: {
                Authorization: `Tariq__${localStorage.getItem('userToken')}`,
              },
            });
            setProfile(data.user);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
    };

    useEffect(() => {
        getProfile();
    }, []); 

    return (
    <>
    <div className='profilePage'>
        <div className='profile bg-qais p-4 w-50'>
            <h2> {profile.userName} profile</h2>
            <h3>{profile.email}</h3>
            {profile.image && profile.image.secure_url ? (
                <img src={profile.image.secure_url} alt={profile._id} className='img-fluid' />
            ) : (
                <p>Loading ...</p>
            )}
            <div className='btns p-3'>
                <Link to="myOrders"> 
                  <button className='btn btn-outline-secondary'>My Orders</button>
                </Link>
            </div>
        </div>
        <Outlet />
    </div>
    </>
  );
}
