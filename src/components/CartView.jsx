import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartView = () => {
  const { cart, removeFromCart, clearCart, total } = useCart(); // Asegúrate de que 'total' está siendo desestructurado del contexto

  return (
    <div>
      <h2>Tu carrito de compras</h2>
      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        cart.map((producto) => (
          <div key={producto.id}>
            <p>
              {producto.name} - ${producto.price} x {producto.quantity}
            </p>
            <button onClick={() => removeFromCart(producto.id)}>Eliminar</button>
          </div>
        ))
      )}
      <p>Total: ${total()}</p> {/* Llamamos a la función total() */}
      <button onClick={clearCart}>Vaciar carrito</button>
      <button>Finalizar compra</button>
    </div>
  );
};

export default CartView;
