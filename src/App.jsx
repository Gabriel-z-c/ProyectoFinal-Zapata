// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer'; // Verifica esta ruta
import ItemDetailContainer from './components/ItemDetailContainer'; // Verifica esta ruta
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

function App() {
  const [cart, setCart] = useState([]); // Estado del carrito

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Agregar producto al carrito
  };

  return (
    <Router>
      <NavBar cart={cart} /> {/* Pasamos el estado del carrito */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Catálogo de productos" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer addToCart={addToCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
