// src/components/CartWidget.jsx
import React from 'react';

const CartWidget = ({ cartLength }) => {
  return (
    <div className="cart-widget">
      🛒
      <span className="cart-count">{cartLength}</span>  {/* Muestra la cantidad de productos */}
    </div>
  );
};

export default CartWidget;
