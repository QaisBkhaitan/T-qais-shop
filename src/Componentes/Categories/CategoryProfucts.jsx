import axios from 'axios';
import React, { useEffect, useState ,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Catrgories.css'; 
import { Slide, toast, Zoom } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { CartContext } from "../../Context/CartContext";

export default function CategoryProducts() {
    const { id } = useParams();
    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const { setCartCounter } = useContext(CartContext);

    const getProducts = async () =>{
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}products/category/${id}`);
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
   useEffect(()=>{
    getProducts();
   },[])
    
   
    
    const addToCart = async (productId) => {
        const token = localStorage.getItem('userToken');
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}cart`, {
                productId
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });

            if (data.message === 'success') {
                toast.success('Added to Cart successfully', {
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
            }
        setCartCounter((prev) => prev + 1);

        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(error.response.data.message, {
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
        }
    };

    return (
        <div className='bg-qais p-4'>
            
            <h2>Products</h2>
            <Link to={'/'}>
                <button type="button" className="btn btn-secondary btn-sm">Back to Categories page</button>
            </Link>
            
            <div className="cards d-flex flex-wrap">
                {loading ? ( 
                    <div className="d-flex justify-content-center p-5">
                        <ClipLoader loading={loading} size={50} color="#36d7b7" /> 
                    </div>
                ) : products.length !== 0 ? (
                    
                    products.map(product => (
                        <div className="product card m-4" key={product._id} style={{ width: '18rem' }}>
                            <img src={product.mainImage.secure_url} className="card-img-top" alt={product.name} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.finalPrice}$</p>
                                <Link to={`/products/${product._id}`}>
                                    <button type="button" className="dbtn btn btn-outline-info">Details</button>
                                </Link>
                                <button 
                                    type="button" 
                                    className="btn btn-dark mt-auto" 
                                    onClick={() => addToCart(product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
    
                <h3>Sorry, there is no Products</h3>
                )}
            </div>
        </div>
    );
}