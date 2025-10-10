import React from 'react';
import CartWidget from './CartWidget';
import "../styles/styles.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo"> 
          <img src="/logo-shop.jpg" alt="logo TierraZen" />
        </h1>
        <div className="navbar-links">
          <a className='a-nav' href="#">Mas Vendidos</a>
          <a className='a-nav' href="#">Ofertas</a>
          <a className='a-nav' href="#">Novedades</a>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
