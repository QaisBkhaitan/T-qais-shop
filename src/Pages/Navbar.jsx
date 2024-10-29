import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./Navbar.css";
import { UserContext } from "../Context/User";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  const { cartCounter } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    navigate("/Signin");
  };

  return (
    <>
      <nav className=" bg-qais navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/Cart" className="nav-link">
                Cart ({cartCounter})
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {userName ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userName} Profile
                  </a>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/Profile" className="dropdown-item">
                        {userName} Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/Profile/myOrders" className="dropdown-item">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button onClick={logout} className="dropdown-item">
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/Signin" className="nav-link">
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}