import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartCounter, setCartCounter] = useState(0);
  const token = localStorage.getItem("userToken");

  const getCartCount = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });

      setCartCounter(data.count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}cart/addItem`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
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
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    getCartCount();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartCounter,
        setCartCounter,
        getCartCount,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;