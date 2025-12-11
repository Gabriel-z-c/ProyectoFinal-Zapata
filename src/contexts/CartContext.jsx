// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const getSavedCart = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(getSavedCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
  const addToCart = (product, qty) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para calcular la cantidad total de productos en el carrito
  const cartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Función para obtener el total de la compra
  const total = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
