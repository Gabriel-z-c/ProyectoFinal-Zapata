import React, { useState } from 'react';
const ItemCount = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1);
  const [error, setError] = useState('');
  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
      setError('');
    } else {
      setError('No puedes agregar más de lo que hay en stock.');
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setError('');
    }
  };

  const handleAddToCart = () => {
    if (count <= stock) {
      onAdd(count);
    } else {
      setError('No puedes agregar más de lo que hay en stock.');
    }
  };

  return (
    <div className="item-count">
      <button onClick={handleDecrement} disabled={count <= 1}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement} disabled={count >= stock}>+</button>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
    </div>
  );
};

export default ItemCount;
