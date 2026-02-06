'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();   // ✅ THIS WAS MISSING
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      id: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image || null,
      brand: product.manufacturer,
      dosage: product.compound,
      packSize: "Strip",
    });

    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <button onClick={handleAddToCart}>
      🛒 Add to Cart
    </button>
  );
}

