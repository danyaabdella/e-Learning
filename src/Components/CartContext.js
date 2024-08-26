'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a Cart Context
export const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
