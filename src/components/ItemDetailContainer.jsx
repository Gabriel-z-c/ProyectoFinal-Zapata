 // src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from './services/firebase';
import ItemCount from './ItemCount';
import { useCart } from '../contexts/CartContext';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const history = useHistory();

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        history.push('/');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, history]);

  const addToCartHandler = (quantity) => {
    if (producto) {
      addToCart({ ...producto, quantity });
      alert(`${quantity} ${producto.name}(s) agregado(s) al carrito`);
    }
  };

  if (loading) return <p>Cargando...</p>;

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="item-detail-container">
      <h2>{producto.name}</h2>
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <p>Stock disponible: {producto.stock}</p>
      <img src={producto.img} alt={producto.name} className="item-detail-image" />
      <ItemCount
        stock={producto.stock}
        onAdd={addToCartHandler}
      />
    </div>
  );
};

export default ItemDetailContainer;