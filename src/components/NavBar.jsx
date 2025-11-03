// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import '../styles/estilos.css';

const NavBar = ({ cart }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/">
            <img src="/img/logo-shop.jpg" alt="Logo Tierra Zen" />
          </Link>
        </h1>
        <div className="navbar-links">
          <Link className="a-nav" to="/category/mas-vendidos">Más Vendidos</Link>
          <Link className="a-nav" to="/category/ofertas">Ofertas</Link>
          <Link className="a-nav" to="/category/novedades">Novedades</Link>
          <CartWidget cart={cart} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;  // Asegúrate de que se está exportando correctamente
