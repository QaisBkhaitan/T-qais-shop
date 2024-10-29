import React, { useEffect, useState ,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'; 
import './Products.css';
import { Slide, toast, Zoom } from 'react-toastify';
import { CartContext } from "../../Context/CartContext";

export default function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { setCartCounter } = useContext(CartContext);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true); 
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false); 
      }
    };

    getProductDetails();
  }, [id]);

  const addToCard = async (productId) => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}cart`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      console.log(data);
      if (data.message === 'success') {
        toast.success('Add to Cart successfully', {
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
      if (error.response.status === 409) {
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
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <ClipLoader loading={loading} size={50} color="#36d7b7" />
      </div>
    );
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='productStyle bg-qais p-4'>
        <h2>Product Details</h2>
        <Link to={'/products'}>
          <button type="button" className="btn btn-secondary btn-sm">Back to products page</button>
        </Link>
        <div className="product card m-4" key={product._id} style={{ width: '95%' }}>
          <img src={product.mainImage.secure_url} className="card-img-top" alt={product.name} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.name}</h5>
            <p>Price: ${product.finalPrice}</p>
            {product.price !== product.finalPrice && (
              <p className='text-decoration-line-through link-danger'>Original Price: ${product.price}</p>
            )}
            <p>{product.description}</p>
            <h4>Reviews: {product.reviews}</h4>
            <button type="button" className="btn btn-outline-success" onClick={() => addToCard(product._id)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
