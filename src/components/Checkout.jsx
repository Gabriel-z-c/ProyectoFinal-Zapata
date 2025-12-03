import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { addOrderToFirestore } from '../services/firebase';
const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !address) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    const orderDetails = {
      customer: { name, email, address },
      products: cart,
      total: cart.reduce((sum, product) => sum + product.price * product.quantity, 0),
      date: new Date(),
    };

    try {
      const orderId = await addOrderToFirestore(orderDetails);
      setOrderId(orderId);
      clearCart();
    } catch (error) {
      setError('Hubo un problema al procesar tu compra');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Procesando tu compra...</p>;  // Mensaje de carga

  if (orderId) {
    return <p>Compra realizada con éxito. Tu ID de orden es: {orderId}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>Confirmar compra</button>
    </form>
  );
};

export default Checkout;
