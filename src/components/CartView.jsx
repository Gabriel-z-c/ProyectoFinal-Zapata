// En el componente donde necesitas acceder al carrito, como CartView
import { useCart } from '../contexts/CartContext';  

const CartView = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  const total = cart.reduce(
    (sum, producto) => sum + producto.precio * producto.quantity,
    0
  );

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.map((producto) => (
        <div key={producto.id}>
          <p>{producto.nombre} - ${producto.precio} x {producto.quantity}</p>
          <button onClick={() => removeFromCart(producto.id)}>Eliminar</button>
        </div>
      ))}
      <p>Total: ${total}</p>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button>Finalizar compra</button>
    </div>
  );
};

export default CartView;
