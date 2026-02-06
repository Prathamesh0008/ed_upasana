'use client';

import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,          // ✅ SINGLE SOURCE OF TRUTH
          name: product.name,
          price: product.price,
          quantity: qty,
          image: product.image || null,
          brand: product.brand || 'Generic',
          dosage: product.dosage || '—',
          packSize: product.packSize || 'Standard Pack',
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);






// // app/context/CartContext.jsx
// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// // REMOVE THIS LINE: import { useCart } from '../context/CartContext';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
  
//   useEffect(() => {
//     // Load cart from localStorage on mount
//     const savedCart = localStorage.getItem('shoppingCart');
//     if (savedCart) {
//       try {
//         setCartItems(JSON.parse(savedCart));
//       } catch (e) {
//         console.error('Error parsing cart:', e);
//       }
//     }
//   }, []);
  
//   const addToCart = (product, quantity = 1) => {
//     setCartItems(prev => {
//       const existingItem = prev.find(item => item.id === product.id);
//       let newCart;
      
//       if (existingItem) {
//         newCart = prev.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       } else {
//         newCart = [...prev, { ...product, quantity }];
//       }
      
//       // Save to localStorage
//       localStorage.setItem('shoppingCart', JSON.stringify(newCart));
//       return newCart;
//     });
    
//     // Dispatch event for other components
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
//   };
  
//   const removeFromCart = (productId) => {
//     setCartItems(prev => {
//       const newCart = prev.filter(item => item.id !== productId);
//       localStorage.setItem('shoppingCart', JSON.stringify(newCart));
//       return newCart;
//     });
    
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
//   };
  
//   const updateQuantity = (productId, quantity) => {
//     setCartItems(prev => {
//       const newCart = prev.map(item =>
//         item.id === productId ? { ...item, quantity } : item
//       );
//       localStorage.setItem('shoppingCart', JSON.stringify(newCart));
//       return newCart;
//     });
    
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
//   };
  
//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem('shoppingCart');
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
//   };
  
//   const cartTotal = cartItems.reduce(
//     (total, item) => total + (item.price * item.quantity),
//     0
//   );
  
//   const cartCount = cartItems.reduce(
//     (count, item) => count + item.quantity,
//     0
//   );
  
//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount,
//         cartTotal,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);