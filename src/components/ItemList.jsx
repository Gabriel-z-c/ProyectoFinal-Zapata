import React from 'react';
import { Link } from 'react-router-dom';  
const ItemList = ({ products, addToCart }) => {
  if (!products || products.length === 0) {
    return <p>No se encontraron productos. Intenta otra categoría o vuelve más tarde.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.img} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Añadir al carrito</button>
          <Link to={`/item/${product.id}`}>Ver detalles</Link>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
