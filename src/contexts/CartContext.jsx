import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
const addToCart = (product) => {
  setCart((prevCart) => {
    const productInCart = prevCart.find(item => item.id === product.id);
    if (productInCart) {
      // Validar si hay suficiente stock
      if (productInCart.quantity + product.quantity <= productInCart.stock) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        alert('No puedes agregar más productos de los que hay en stock.');
        return prevCart; // No modificamos el carrito si no hay stock suficiente
      }
    }
    return [...prevCart, { ...product, quantity: product.quantity }];
  });
};
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');  // Limpiar el carrito en localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
