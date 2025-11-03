// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import { getProducts } from '../components/services/AsyncService';  
import Item from './Item';

const ItemListContainer = ({ greeting = "Bienvenido" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
 return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      {products.map(product => (
        <Item key={product.id} prod={product} />
      ))}
    </div>
  );
};

export default ItemListContainer;  // Asegúrate de que se está exportando correctamente
