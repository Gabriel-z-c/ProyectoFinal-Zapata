import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../components/services/AsyncService';

const ItemListContainer = ({ greeting = "Bienvenido" }) => {
  const { categoryId } = useParams();  // Obtiene el ID de la categoría desde la URL
  const [products, setProducts] = useState([]);  // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);  // Activa el estado de carga antes de la solicitud

      try {
        let fetchedProducts = [];

        if (categoryId) {
          fetchedProducts = await getProductsByCategory(categoryId);
        } else {
          fetchedProducts = await getProducts();
        }

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          setProducts([]);  // En caso de que la respuesta no sea un arreglo
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setProducts([]);  // En caso de error, mostrar lista vacía
      } finally {
        setLoading(false);  // Desactiva el estado de carga
      }
    };

    fetchProducts();
  }, [categoryId]);  // El efecto se ejecuta cuando cambia la categoría

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles en esta categoría.</p>  // Mensaje si no se encuentran productos
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <Link to={`/item/${product.id}`}>Ver Detalle</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
