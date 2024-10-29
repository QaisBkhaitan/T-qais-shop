import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";
import { Slide, toast, Zoom } from "react-toastify";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CartContext } from "../../Context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCartCounter } = useContext(CartContext);

  const token = localStorage.getItem("userToken");

  const itemsPerPage = 3;

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}products?page=1&limit=50`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setProducts(data.products);
      setTotalPages(Math.ceil(data.products.length / itemsPerPage));
      setLoading(false);
    } catch (error) {
      setError(error.message || "Something went wrong");
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const addToCard = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("Added to Cart successfully", {
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
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="bg-qais p-3">
        <h2>All Products</h2>

        {loading ? (
          <div className="d-flex justify-content-center p-5">
            <ClipLoader loading={loading} size={50} color="#36d7b7" />
          </div>
        ) : (
          <>
            {error && (
              <p className="text-danger">Failed to load products: {error}</p>
            )}

            <div className="d-flex flex-wrap justify-content-center ">
              {paginatedProducts.map((product) => (
                <div
                  className="product card m-4"
                  key={product._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={product.mainImage.secure_url}
                    className="card-img-top"
                    alt={product.name}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.finalPrice}$</p>

                    <Link to={`/products/${product._id}`}>
                      <button
                        type="button"
                        className="dbtn btn btn-outline-info"
                      >
                        Details
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-dark mt-auto"
                      onClick={() => addToCard(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {!loading && (
        <nav className=" Page navigation example bg-qais ">
          <ul className="pagination bg-qais">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                key={index}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}