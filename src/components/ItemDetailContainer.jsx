// src/components/ItemDetailContainer.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../components/services/AsyncService';  // Verifica que ahora apunte a AsyncService.js
import ItemCount from './ItemCount';

const ItemDetailContainer = ({ addToCart }) => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await getProductById(id); // Obtener el producto por ID
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = (quantity) => {
    addToCart({ ...product, quantity });
    alert(`${quantity} producto(s) agregado(s) al carrito`);
  };

  if (loading) return <p>Cargando detalle del producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="item-detail-container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <img src={product.img} alt={product.name} />
      <ItemCount stock={product.stock} onAdd={addToCartHandler} />
    </div>
  );
};

export default ItemDetailContainer;  // Asegúrate de que está exportado correctamente
