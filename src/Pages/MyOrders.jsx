import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MyOrder.css'; 

export default function MyOrders() {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true); 

    const getOrder = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}order`, {
                headers: {
                    Authorization: `Tariq__${localStorage.getItem('userToken')}`,
                },
            });
            setOrder(data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div className="container my-orders-page">
            <h2 className="text-center my-4">My Orders</h2>

            {loading ? (
                <div className="text-center">
                    <div className="loader"></div> 
                    <p>Loading your orders...</p>
                </div>
            ) : order.length === 0 ? (
                <p className="text-center">You don't have any orders yet!</p>
            ) : (
                order.map((item) => (
                    <div className="order-card mb-5" key={item._id}>
                        <h4 className="mb-3">Order_ID: #{item._id}</h4>
                        <div className="row">
                            {item.products.map((product) => (
                                <div className="col-md-4" key={product._id}>
                                    <div className="card product-card mb-4 shadow-sm">
                                        <div className="card-image">
                                            <img
                                                src={product.productId.mainImage.secure_url}
                                                className="card-img-top"
                                                alt={product.productId.name}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-center">
                                                {product.productId.name}
                                            </h5>
                                            <p className="card-text price-text text-center">
                                                ${product.finalPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
