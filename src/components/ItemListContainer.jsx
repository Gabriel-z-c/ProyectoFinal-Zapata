// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsFromFirestore, getProductsByCategory } from "./services/firebase";
import ItemList from './ItemList';
import { useCart } from '../contexts/CartContext'; 

const ItemListContainer = ({ greeting = "Bienvenido" }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts;
        if (categoryId) {
          fetchedProducts = await getProductsByCategory(categoryId);
        } else {
          fetchedProducts = await getProductsFromFirestore();
        }
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <ItemList products={products} addToCart={addToCart} /> {/* Pasamos addToCart a ItemList */}
    </div>
  );
};

export default ItemListContainer;
