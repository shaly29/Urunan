import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Header = ({ cartItems }) => {
    const [user, setUser] = useState(null);
    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${email}`);
                const data = await response.json();
                console.log(data)
                if (data.success) {
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
    }, [email]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        window.location.reload();
    };


    return (
        <>
            <header className="site-header" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header-logo">
                                <a href="/">
                                    <img src={require("../assets/images/final.png")} style={{width:"160px",height:"160px",marginLeft:"px"}}/>
                                  
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="main-navigation">
                                <button className="menu-toggle"><span></span><span></span></button>
                                <nav className="header-menu">
                                    <ul className="menu food-nav-menu">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#about">About</a></li>
                                        <li><a href="allproducts">Shop</a></li>
                                        <li><a href="contact">Contact</a></li>

                                    </ul>
                                </nav>
                                <div className="header-right">

                                    <Link to={"/cart"}  >  <a href="/cart" className="header-btn header-cart">
                                        <i className="uil uil-shopping-bag"></i>
                                        <span className="cart-number ml-1" id="cart_count">{cartItems.length}</span>
                                    </a></Link>
                                  
                                    {user && user.isAdmin === "true" && (
                                   
                                        <a href="/admin" className="-sm-square header-btn ms-3" style={{
                                            '--bs-btn-padding-y': '.85rem',
                                            '--bs-btn-padding-x': '.85rem',
                                            '--bs-btn-font-size': '1.5rem',
                                        }} > 
                                        
                                         <i class="fi fi-rr-admin-alt" style={{color:"#763B45"}}></i>
                                        </a>
                                    )}
                                    
                                    {email ? (<a className="-sm-square header-btn ms-3" href="/login" onClick={handleLogout}>
                                    
                                    <i className="uil uil-sign-out-alt"></i>
                                       </a>
                                    ) : (<a className="-sm-square header-btn ms-3" href="/login" onClick={myFunction}>
                                        <i className="uil uil-user-md"></i></a>)}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


        </>
    )
}
function myFunction() {
    alert('Login button was clicked!');
}
export default Header