import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ cartItems }) => {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Check if email exists before making the API call
    if (email) {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${email}`);
                const data = await response.json();
                console.log(data);
                
                if (data.success) {
                    // Save the userId to localStorage
                    localStorage.setItem("userId", data.response._id);
                    setUser(data.response);
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }
}, [email]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="header-logo">
                <Link to="/">
                  <img
                    src={require("../assets/images/final.png")}
                    style={{ width: "160px", height: "160px" }}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="main-navigation">
                <button className="menu-toggle">
                  <span></span>
                  <span></span>
                </button>
                <nav className="header-menu">
                  <ul className="menu food-nav-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/allproducts">Shop</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </nav>
                <div className="header-right">
                  <Link to="/cart" className="header-btn header-cart">
                    <i className="uil uil-shopping-bag"></i>
                    <span className="cart-number ml-1" id="cart_count">{cartItems.length}</span>
                  </Link>

                  {user && user.isAdmin && (
                    <Link
                      to="/admin"
                      className="header-btn ms-3"
                      style={{
                        '--bs-btn-padding-y': '.85rem',
                        '--bs-btn-padding-x': '.85rem',
                        '--bs-btn-font-size': '1.5rem',
                      }}
                    >
                      <i className="fi fi-rr-admin-alt" style={{ color: "#763B45" }}></i>
                    </Link>
                  )}

                  {email ? (
                    <button className="header-btn ms-3" onClick={handleLogout}>
                      <i className="uil uil-sign-out-alt"></i>
                    </button>
                  ) : (
                    <Link to="/login" className="header-btn ms-3">
                      <i className="uil uil-user-md"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
