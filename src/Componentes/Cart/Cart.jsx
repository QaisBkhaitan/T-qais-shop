import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "swiper/css";
import "./Cart.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import ClipLoader from "react-spinners/ClipLoader";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const { setCartCounter } = useContext(CartContext);
  const token = localStorage.getItem("userToken");

  const getCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCart(data.products);

      const initialQuantities = data.products.reduce((acc, item) => {
        acc[item.productId] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
      calculateTotalCost(data.products, initialQuantities);
      setCartCounter(data.count);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCart([]);
      setTotalCost(0);
      setCartCounter(0);
      getCart();
    } catch (error) {
      console.error(
        "Error clearing the cart:",
        error.response?.data || error.message
      );
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}cart/removeItem`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartCounter((prev) => prev - 1);
      getCart();
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response?.data || error.message
      );
    }
  };

  const handleIncrease = async (productId) => {
    const newQuantity = (quantities[productId] || 1) + 1;
    handleQuantityChange(productId, newQuantity);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API}cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error increasing quantity:",
        error.response?.data || error.message
      );
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    calculateTotalCost(cart, { ...quantities, [productId]: quantity });
  };

  const handleDecrease = async (productId) => {
    const newQuantity = (quantities[productId] || 1) - 1;
    if (newQuantity > 0) {
      handleQuantityChange(productId, newQuantity);

      try {
        await axios.patch(
          `${import.meta.env.VITE_API}cart/decraseQuantity`,
          { productId },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
      } catch (error) {
        console.error(
          "Error decreasing quantity:",
          error.response?.data || error.message
        );
      }
    }
  };

  const calculateTotalCost = (cartItems, quantities) => {
    const total = cartItems.reduce((acc, item) => {
      const quantity = quantities[item.productId] || 1;
      return acc + item.details.price * quantity;
    }, 0);
    setTotalCost(total);
  };

  useEffect(() => {
    getCart();
  }, [refresh]);

  return (
    <>
      <section className="h-100 bg-qais">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-normal mb-0">Shopping Cart</h2>
              </div>
              {loading ? (
                <div className="d-flex justify-content-center p-5">
                  <ClipLoader loading={loading} size={50} color="#36d7b7" />
                </div>
              ) : cart.length > 0 ? (
                <div>
                  {cart.map((item) => (
                    <div className="card rounded-3 mb-4 cardbg" key={item._id}>
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={item.details.mainImage.secure_url}
                              className="card-img-top"
                              alt={item.details.name}
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2 p-5">
                              {item.details.name}
                            </p>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center ">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleDecrease(item.productId)}
                            >
                              -
                            </button>
                            <input
                              id="form1"
                              min={1}
                              name="quantity"
                              value={quantities[item.productId] || 1}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.productId,
                                  parseInt(e.target.value, 10)
                                )
                              }
                              type="number"
                              className="form-control form-control-sm mx-2 p-3"
                            />
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleIncrease(item.productId)}
                            >
                              +
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{item.details.price}$</h5>
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeItem(item.productId)}
                          >
                            Remove From The Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Your cart is empty.</p>
              )}
              <div className="card mb-4">
                <div className="card-body">
                  <h5>Total Cost: {totalCost}$</h5>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <button
                    type="button"
                    className="btnClr btn btn-danger "
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  {cart.length > 0 && (
                    <Link to={"/Order"}>
                      <button type="button" className="btn btn-warning">
                        Proceed to Pay
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}