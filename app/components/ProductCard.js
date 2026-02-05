'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pill, ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductDetails } from '@/data/products';

export default function ProductCard({ slug, manufacturer, compound }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get product details with fallback defaults
  const productDetails = getProductDetails(slug) || {
    name: slug.replace(/-/g, ' '),
    price: 29.99,
    rating: 4.5,
    stock: 10,
    description: `${compound} medication for erectile dysfunction`,
    deliveryTime: '3-5 days',
    imageType: 'pill',
    requiresPrescription: false
  };
  
  const isInStock = productDetails.stock > 0;
  const maxQuantity = Math.min(productDetails.stock, 10);
  
  const handleAddToCart = () => {
    // Check if useCart hook is available
    if (addToCart) {
      addToCart({
        id: `${slug}-${Date.now()}`,
        name: productDetails.name,
        price: productDetails.price,
        quantity: quantity,
        maxQuantity: maxQuantity,
        requiresPrescription: productDetails.requiresPrescription || false,
        inStock: isInStock,
        deliveryTime: productDetails.deliveryTime || '3-5 days',
        imageType: productDetails.imageType || 'pill',
        slug: slug
      });
      
      alert(`${quantity} ${productDetails.name} added to cart!`);
    } else {
      console.error('Cart context not available');
      alert('Unable to add to cart. Please try again.');
    }
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    alert(`${isFavorite ? 'Removed from' : 'Added to'} favorites!`);
  };
  
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-[#ABAFB5]/20 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#2596be]/30">
      {/* Product Image */}
      <div className="p-4 md:p-6 bg-gradient-to-br from-[#f8fafc] to-white">
        <div className="w-full h-40 md:h-48 rounded-xl bg-gradient-to-r from-[#122E34]/5 to-[#2596be]/5 flex items-center justify-center relative">
          <Pill className="h-12 w-12 md:h-16 md:w-16 text-[#2596be]" />
          
          {/* Stock Status */}
          {!isInStock ? (
            <div className="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
              Out of Stock
            </div>
          ) : productDetails.stock < 10 ? (
            <div className="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
              Low Stock
            </div>
          ) : null}
          
          {/* Manufacturer Badge */}
          <div className="absolute bottom-3 left-3 inline-flex items-center px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm text-xs text-[#0E1D21] font-medium border border-[#ABAFB5]/30">
            {manufacturer}
          </div>
        </div>
        
        {/* Compound Badge */}
        <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full bg-[#2596be]/10 text-[#2596be] text-xs font-medium">
          {compound}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#0E1D21] text-base md:text-lg truncate" title={productDetails.name}>
              {productDetails.name}
            </h3>
            <p className="text-xs md:text-sm text-[#677E8A] truncate">
              {manufacturer} • {compound}
            </p>
          </div>
          <button 
            onClick={handleFavoriteToggle}
            className={`ml-2 flex-shrink-0 p-1 hover:scale-110 transition-transform ${isFavorite ? 'text-red-500' : 'text-[#677E8A] hover:text-red-500'}`}
          >
            <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <p className="text-xs md:text-sm text-[#677E8A] mb-3 md:mb-4 line-clamp-2">
          {productDetails.description || `${compound} medication for erectile dysfunction`}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 md:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 md:h-4 md:w-4 ${i < Math.floor(productDetails.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs md:text-sm text-[#677E8A] ml-1 md:ml-2">
            {productDetails.rating.toFixed(1)} ({Math.floor(Math.random() * 100) + 50})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xl md:text-2xl font-bold text-[#0E1D21]">${productDetails.price.toFixed(2)}</p>
            {productDetails.originalPrice && (
              <p className="text-xs md:text-sm text-[#677E8A] line-through">${productDetails.originalPrice.toFixed(2)}</p>
            )}
          </div>
          <div className="text-xs md:text-sm text-[#677E8A] text-right">
            <div className="font-medium text-green-600">{productDetails.stock} in stock</div>
            <div className="text-[10px] md:text-xs">ID: {slug}</div>
          </div>
        </div>
        
        {/* Quantity and Add to Cart */}
        <div className="flex gap-2 md:gap-3">
          <div className="flex items-center border border-[#ABAFB5] rounded-lg flex-shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 md:p-2 hover:bg-[#2596be]/5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity <= 1}
            >
              <span className="text-base md:text-lg">−</span>
            </button>
            <span className="px-2 md:px-4 py-1 md:py-2 text-center min-w-[40px] md:min-w-[60px] text-base md:text-lg font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="p-1 md:p-2 hover:bg-[#2596be]/5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity >= maxQuantity}
            >
              <span className="text-base md:text-lg">+</span>
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all ${
              isInStock
                ? 'bg-gradient-to-r from-[#122E34] to-[#2596be] text-white hover:from-[#122E34]/90 hover:to-[#2596be]/90 hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Add to Cart</span>
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 md:mt-4 flex gap-2 border-t border-[#ABAFB5]/20 pt-3 md:pt-4">
          <Link
            href={`/products/${slug}`}
            className="flex-1 text-center px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm border border-[#2596be] text-[#2596be] rounded-lg hover:bg-[#2596be]/5 transition-colors"
          >
            View Details
          </Link>
          <button 
            onClick={() => {
              if (isInStock) {
                handleAddToCart();
                // In a real app, you would navigate to checkout
                alert(`Proceeding to checkout with ${quantity} ${productDetails.name}`);
              }
            }}
            disabled={!isInStock}
            className={`flex-1 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm border rounded-lg transition-colors ${
              isInStock
                ? 'border-[#0E1D21] text-[#0E1D21] hover:bg-[#0E1D21] hover:text-white'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}