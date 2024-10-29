import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Catrgories.css';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; 

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}categories/active?limit=10`);
            setCategories(data.categories); 
        } catch (error) {
            setError(error.message || 'Something went wrong');
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className='bg-qais p-3 home'>
            <div className='homePage'>
                <h2>home</h2>
                <div className='homeDis'>
                <img src='src/assets/home.png' className='ecom'/>
                <div className='dis'>
                    <h2>Welcome to E-commerce!</h2>
                    <h3>We're dedicated to delivering an outstanding shopping experience, offering premium products and exceptional customer service.</h3>
                    <p>Our mission is to ensure that every step of your journey with us is seamless, backed by quality and care.</p>
                </div>
           
                </div>

            </div>
            <h2>Categories</h2>
            <div className='scroll-container'>
                {error && <p className="error-message">Failed to load categories: {error}</p>}

                {loading ? ( 
                <div className='d-flex justify-content-center w-100'>

                    <div className="d-flex justify-content-center p-5">
                        <ClipLoader loading={loading} size={50} color="#36d7b7" />
                    </div>
                    </div>
                ) : (
                    categories.length > 0 ? 
                    (
                        categories.map(category => (
                            <div className="category" key={category._id}>
                                <Link to={`/categories/${category._id}`}>
                                    <button type="button" className="btn btn-outline-secondary">
                                        <img src={category.image.secure_url} alt={category.name} className="img-fluid" />
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No categories available.</p> 
                    )
                )}
            </div>
        </div>
    );
}
