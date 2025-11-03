// src/components/CartWidget.js
import React from 'react';

const CartWidget = ({ cart }) => {
  console.log('Cart en CartWidget:', cart); // Verifica que cart se pase correctamente
  const cartLength = Array.isArray(cart) ? cart.length : 0; // Verifica la longitud de cart
  return (
    <div className="cart-widget">
      🛒
      <span className="cart-count">{cartLength}</span> {/* Muestra la longitud del carrito */}
    </div>
  );
};

export default CartWidget;
