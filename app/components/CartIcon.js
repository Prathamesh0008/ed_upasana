'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart size={24} className="text-[#0E1D21] hover:text-[#2596be] transition-colors" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#2596be] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          {cartCount}
        </span>
      )}
    </Link>
  );
}