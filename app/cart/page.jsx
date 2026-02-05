"use client"; 
import React, { useState, useEffect } from 'react';
import { getProductDetails, getAllProducts } from '../data/Products';
import { ShoppingCart, Trash2, Plus, Minus, Package, Truck, CreditCard, ArrowRight, Shield, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Your color palette
  const colors = {
    primary: '#2596be',
    secondary: '#ABAFB5',
    accent: '#677E8A',
    danger: '#622347',
    dark: '#122E34',
    darkest: '#0E1D21',
    light: '#f8f9fa'
  };

  // Load products on component mount
  useEffect(() => {
    const products = getAllProducts();
    setAllProducts(products);
    setLoading(false);
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem('shoppingCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('shoppingCart');
    }
  }, [cartItems]);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 49.99; // Free shipping over $5000
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  // Add item to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.slug === product.slug);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, {
          ...product,
          quantity: 1,
          id: Date.now() + Math.random()
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (slug) => {
    setCartItems(prevItems => prevItems.filter(item => item.slug !== slug));
  };

  // Update item quantity
  const updateQuantity = (slug, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(slug);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.slug === slug
          ? { ...item, quantity: Math.min(newQuantity, item.stock || 99) }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  };

  // Navigate to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    router.push('/checkout');
  };

  // Get product image based on type
  const getProductImage = (product) => {
    const imageMap = {
      'tablet': '💊',
      'capsule': '🧪',
      'injection': '💉',
      'liquid': '🧴',
      'cream': '🧴',
      'default': '📦'
    };
    
    return imageMap[product.imageType] || imageMap.default;
  };

  // Get product color class
  const getProductColor = (requiresPrescription) => {
    return requiresPrescription 
      ? `border-l-4 border-[${colors.danger}] bg-[${colors.danger}]/10`
      : `border-l-4 border-[${colors.primary}] bg-[${colors.primary}]/10`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2596be]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with your color scheme */}
      <div className="bg-gradient-to-r from-[#122E34] to-[#0E1D21] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <ShoppingCart size={36} />
                Shopping Cart
              </h1>
              <p className="text-[#ABAFB5] mt-2">Review your items and proceed to checkout</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</div>
              <div className="text-sm text-[#ABAFB5]">Items</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-[#ABAFB5]/20">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Browse our specialized medications and add items to get started</p>
                <button
                  onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#2596be] hover:bg-[#122E34] text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                >
                  View Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow border border-[#ABAFB5]/20">
                  <h2 className="text-xl font-bold text-gray-800">Cart Items ({cartItems.length})</h2>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-[#622347] hover:text-[#7a2c5a] transition"
                  >
                    <Trash2 size={20} />
                    Clear Cart
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white rounded-xl shadow p-4 md:p-6 border border-[#ABAFB5]/20 ${getProductColor(item.requiresPrescription)}`}
                      style={{
                        borderLeftColor: item.requiresPrescription ? colors.danger : colors.primary,
                        backgroundColor: item.requiresPrescription ? `${colors.danger}10` : `${colors.primary}10`
                      }}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Product Image/Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-white border-2 border-[#ABAFB5]/30 rounded-lg flex items-center justify-center text-3xl">
                            {getProductImage(item)}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-start justify-between">
                            <div className="flex-grow">
                              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                              <p className="text-sm text-[#677E8A] mt-1">{item.manufacturer}</p>
                              <p className="text-xs text-[#ABAFB5] mt-1">{item.dosage}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  item.requiresPrescription
                                    ? 'bg-[#622347]/10 text-[#622347]'
                                    : 'bg-[#2596be]/10 text-[#2596be]'
                                }`}>
                                  {item.requiresPrescription ? 'Prescription Required' : 'OTC'}
                                </span>
                                {item.stock <= 10 && (
                                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                    Low Stock: {item.stock}
                                  </span>
                                )}
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#677E8A]/10 text-[#677E8A]">
                                  Delivery: {item.deliveryTime}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3 md:mt-0 text-right min-w-[120px]">
                              <p className="text-xl font-bold text-[#0E1D21]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-[#677E8A]">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-[#ABAFB5]/30">
                            <div className="flex items-center gap-4 mb-3 sm:mb-0">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full bg-[#ABAFB5]/20 hover:bg-[#ABAFB5]/30 flex items-center justify-center transition"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={16} className="text-[#677E8A]" />
                                </button>
                                <span className="w-12 text-center font-semibold text-[#0E1D21]">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full bg-[#ABAFB5]/20 hover:bg-[#ABAFB5]/30 flex items-center justify-center transition"
                                  disabled={item.quantity >= (item.stock || 99)}
                                >
                                  <Plus size={16} className="text-[#677E8A]" />
                                </button>
                              </div>
                              <span className="text-sm text-[#677E8A]">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </span>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.slug)}
                              className="flex items-center gap-2 text-[#622347] hover:text-[#7a2c5a] transition"
                            >
                              <Trash2 size={18} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-[#ABAFB5]/20">
              <h2 className="text-xl font-bold text-[#0E1D21] mb-6">Order Summary</h2>

              {/* Order Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="font-semibold text-[#0E1D21]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A] flex items-center gap-2">
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span className="font-semibold text-[#0E1D21]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Tax (8%)</span>
                  <span className="font-semibold text-[#0E1D21]">${tax.toFixed(2)}</span>
                </div>

                {subtotal < 5000 && (
                  <div className="bg-[#2596be]/10 border border-[#2596be]/20 rounded-lg p-3">
                    <p className="text-sm text-[#122E34]">
                      Add ${(5000 - subtotal).toFixed(2)} more for <strong>FREE shipping</strong>
                    </p>
                  </div>
                )}

                <div className="border-t border-[#ABAFB5]/30 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#0E1D21]">Total</span>
                    <span className="text-[#2596be]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                  cartItems.length === 0
                    ? 'bg-[#ABAFB5] cursor-not-allowed text-[#677E8A]'
                    : 'bg-[#2596be] hover:bg-[#122E34] text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <CreditCard size={20} />
                Proceed to Checkout
                <ArrowRight size={20} />
              </button>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-[#122E34]/10 border border-[#122E34]/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-[#2596be]">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#122E34]">Secure Checkout</p>
                    <p className="text-xs text-[#677E8A]">Your information is protected</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-[#ABAFB5]/30">
                <p className="text-sm text-[#677E8A] mb-3">We accept</p>
                <div className="flex gap-2">
                  {['💳', '🏦', '📱', '💰'].map((icon, index) => (
                    <div key={index} className="w-10 h-10 bg-[#ABAFB5]/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Products Section */}
        {allProducts.length > 0 && (
          <div id="products" className="mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-[#0E1D21]">Available Products</h2>
              <div className="flex items-center gap-2 text-[#2596be]">
                <Package size={20} />
                <span className="font-medium">{allProducts.length} specialized medications</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {allProducts.map((product) => {
                const isInCart = cartItems.find(item => item.slug === product.slug);
                const cartQuantity = isInCart ? isInCart.quantity : 0;
                
                return (
                  <div
                    key={product.slug}
                    className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#ABAFB5]/20"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-[#0E1D21] line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-[#677E8A] truncate">{product.manufacturer}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                          product.requiresPrescription 
                            ? 'bg-[#622347]/10 text-[#622347]' 
                            : 'bg-[#2596be]/10 text-[#2596be]'
                        }`}>
                          {product.requiresPrescription ? 'RX' : 'OTC'}
                        </span>
                      </div>
                      
                      <p className="text-[#677E8A] mb-4 text-sm line-clamp-2 h-10">{product.description}</p>
                      
                      <div className="mb-2">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-500'
                                  : 'text-[#ABAFB5]'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-2 text-sm text-[#677E8A]">({product.rating})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-xl text-[#0E1D21]">${product.price.toFixed(2)}</p>
                            <p className="text-sm text-[#677E8A]">
                              Stock: <span className={product.stock <= 10 ? 'text-[#622347] font-semibold' : 'text-[#2596be]'}>
                                {product.stock} units
                              </span>
                            </p>
                          </div>
                          
                          <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock <= 0}
                            className={`px-4 py-2 rounded-lg font-semibold transition relative ${
                              isInCart
                                ? 'bg-[#2596be] text-white cursor-default'
                                : product.stock <= 0
                                ? 'bg-[#ABAFB5] cursor-not-allowed text-[#677E8A]'
                                : 'bg-[#122E34] hover:bg-[#0E1D21] text-white'
                            }`}
                          >
                            {isInCart ? (
                              <div className="flex items-center gap-2">
                                <span>✓ {cartQuantity} in cart</span>
                                <Plus 
                                  size={16} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                  }}
                                  className="hover:scale-110 transition-transform cursor-pointer"
                                />
                              </div>
                            ) : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-[#ABAFB5]/20">
                        <div className="flex items-center gap-2 text-xs text-[#677E8A]">
                          <span>🕒</span>
                          <span>Delivery: {product.deliveryTime}</span>
                          <span className="mx-1">•</span>
                          <span>💊</span>
                          <span>{product.dosage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}   

        {/* Empty State when no products */}
        {!loading && allProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-[#0E1D21] mb-2">No Products Available</h3>
            <p className="text-[#677E8A]">Check back later for new specialized medications</p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-8 bg-white border-t border-[#ABAFB5]/20 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-[#677E8A] text-sm">
            <strong className="text-[#0E1D21]">Important Note:</strong> All prescription medications require a valid prescription from a licensed healthcare provider. 
            OTC items can be purchased without a prescription. Prices are in USD. Please consult with your healthcare provider before starting any medication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;