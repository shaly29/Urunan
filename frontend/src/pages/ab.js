import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css'; // Make sure to import your CSS file here if it's not already imported
const Header = () => {
  const iconStyle = { color: '#F8E4BE' };
  return (
    <header>
      <div className="nav container">
        <a href="home" className="logo">Viluthu</a>
        <div className="navbar">
          <a href="#header" className="nav_link">Home</a>
          <a href="#products" className="nav_link">Products</a>
          <a href="PlantCard" className="nav_link">Plants</a>
          <a href="#team" className="nav_link">Fertilizer</a>
          <a href="#review" className="nav_link">Reviews</a>
        </div>
        <div className="fontas">
        <div className="d-none d-lg-flex ms-2">
            <a className="-sm-square rounded- ms-3" href="/login" onClick={myFunction}>
                <FontAwesomeIcon icon={faUser} style={iconStyle} />
            </a>
            <a className="btn-sm-square rounded-circle ms-3" href="/login">
                <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
            </a>
        </div>
        </div>
      </div>
    </header>
  );
}
function myFunction() {
  alert('Login button was clicked!');
}
export default Header;