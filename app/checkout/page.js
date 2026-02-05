"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, Lock, Shield, Truck, Home, Mail, Phone, 
  User, MapPin, Calendar, AlertCircle, CheckCircle,
  ArrowLeft, Package, CreditCard as CardIcon, Landmark, Smartphone
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit_card',
    
    // Shipping
    shippingMethod: 'standard',
    sameAsBilling: true,
    
    // Prescription verification
    prescriptionVerified: false,
    doctorName: '',
    doctorLicense: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Color palette
  const colors = {
    primary: '#2596be',
    secondary: '#ABAFB5',
    accent: '#677E8A',
    danger: '#622347',
    dark: '#122E34',
    darkest: '#0E1D21',
    light: '#f8f9fa'
  };

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        
        // If cart is empty, redirect to cart page
        if (items.length === 0) {
          router.push('/cart');
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setLoading(false);
  }, [router]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = formData.shippingMethod === 'express' ? 99.99 : 
                  subtotal > 5000 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Shipping methods
  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', cost: subtotal > 5000 ? 'FREE' : '$49.99', delivery: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', cost: '$99.99', delivery: '1-2 business days' },
    { id: 'overnight', name: 'Overnight Shipping', cost: '$149.99', delivery: 'Next business day' }
  ];

  // Payment methods
  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: CardIcon },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Landmark },
    { id: 'digital_wallet', name: 'Digital Wallet', icon: Smartphone }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Payment validation
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Please use MM/YY format';
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }
    
    // Check for prescription items
    const hasPrescriptionItems = cartItems.some(item => item.requiresPrescription);
    if (hasPrescriptionItems && !formData.prescriptionVerified) {
      newErrors.prescriptionVerified = 'Prescription verification is required for prescription medications';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Generate order number
    const generatedOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(generatedOrderNumber);
    
    // In a real app, you would send this data to your backend
    const orderData = {
      ...formData,
      cartItems,
      subtotal,
      shipping,
      tax,
      total,
      orderNumber: generatedOrderNumber,
      timestamp: new Date().toISOString()
    };
    
    // Save order to localStorage (simulating backend)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Clear cart
    localStorage.removeItem('shoppingCart');
    setCartItems([]);
    
    // Show success
    setOrderPlaced(true);
  };

  // Format card number
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2596be]"></div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-[#ABAFB5]/20">
              <div className="w-20 h-20 bg-[#2596be]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-[#2596be]" size={48} />
              </div>
              
              <h1 className="text-3xl font-bold text-[#0E1D21] mb-4">Order Confirmed!</h1>
              <p className="text-[#677E8A] mb-6">
                Thank you for your order. Your order number is:
              </p>
              
              <div className="bg-[#122E34]/5 border border-[#122E34]/10 rounded-xl p-4 mb-6">
                <p className="text-xl font-bold text-[#2596be]">{orderNumber}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Items Total</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                  <span className="text-[#0E1D21]">Total</span>
                  <span className="text-[#2596be]">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-[#2596be]/10 border border-[#2596be]/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-[#122E34]">
                  A confirmation email has been sent to <strong>{formData.email}</strong>. 
                  You will receive tracking information once your order ships.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 bg-[#2596be] hover:bg-[#122E34] text-white py-3 rounded-lg font-semibold transition"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => router.push('/orders')}
                  className="flex-1 bg-white border border-[#ABAFB5] hover:border-[#677E8A] text-[#0E1D21] py-3 rounded-lg font-semibold transition"
                >
                  View Order Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/cart')}
            className="flex items-center gap-2 text-[#2596be] hover:text-[#122E34] mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          
          <h1 className="text-3xl font-bold text-[#0E1D21] mb-2">Checkout</h1>
          <p className="text-[#677E8A]">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ABAFB5]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2596be]/10 rounded-full flex items-center justify-center">
                    <User className="text-[#2596be]" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0E1D21]">Contact Information</h2>
                    <p className="text-sm text-[#677E8A]">We'll use this to contact you about your order</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.firstName 
                          ? 'border-[#622347] focus:border-[#622347]' 
                          : 'border-[#ABAFB5] focus:border-[#2596be]'
                      } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.lastName 
                          ? 'border-[#622347] focus:border-[#622347]' 
                          : 'border-[#ABAFB5] focus:border-[#2596be]'
                      } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email 
                          ? 'border-[#622347] focus:border-[#622347]' 
                          : 'border-[#ABAFB5] focus:border-[#2596be]'
                      } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone 
                          ? 'border-[#622347] focus:border-[#622347]' 
                          : 'border-[#ABAFB5] focus:border-[#2596be]'
                      } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ABAFB5]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2596be]/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-[#2596be]" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0E1D21]">Shipping Address</h2>
                    <p className="text-sm text-[#677E8A]">Where should we deliver your order?</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.address 
                          ? 'border-[#622347] focus:border-[#622347]' 
                          : 'border-[#ABAFB5] focus:border-[#2596be]'
                      } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.address}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.city 
                            ? 'border-[#622347] focus:border-[#622347]' 
                            : 'border-[#ABAFB5] focus:border-[#2596be]'
                        } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.city}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.state 
                            ? 'border-[#622347] focus:border-[#622347]' 
                            : 'border-[#ABAFB5] focus:border-[#2596be]'
                        } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.state}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.zipCode 
                            ? 'border-[#622347] focus:border-[#622347]' 
                            : 'border-[#ABAFB5] focus:border-[#2596be]'
                        } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ABAFB5]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2596be]/10 rounded-full flex items-center justify-center">
                    <CreditCard className="text-[#2596be]" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0E1D21]">Payment Method</h2>
                    <p className="text-sm text-[#677E8A]">How would you like to pay?</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => handleInputChange({
                          target: { name: 'paymentMethod', value: method.id }
                        })}
                        className={`p-4 rounded-xl border-2 text-left transition ${
                          formData.paymentMethod === method.id
                            ? 'border-[#2596be] bg-[#2596be]/5'
                            : 'border-[#ABAFB5] hover:border-[#677E8A]'
                        }`}
                      >
                        <method.icon className="text-[#677E8A] mb-2" size={24} />
                        <div className="font-medium text-[#0E1D21]">{method.name}</div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Credit Card Details */}
                  {formData.paymentMethod === 'credit_card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            handleInputChange({
                              target: { name: 'cardNumber', value: formatted }
                            });
                          }}
                          maxLength={19}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.cardNumber 
                              ? 'border-[#622347] focus:border-[#622347]' 
                              : 'border-[#ABAFB5] focus:border-[#2596be]'
                          } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.cardName 
                                ? 'border-[#622347] focus:border-[#622347]' 
                                : 'border-[#ABAFB5] focus:border-[#2596be]'
                            } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                            placeholder="John Doe"
                          />
                          {errors.cardName && (
                            <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                              <AlertCircle size={14} />
                              {errors.cardName}
                            </p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg border ${
                                errors.expiryDate 
                                  ? 'border-[#622347] focus:border-[#622347]' 
                                  : 'border-[#ABAFB5] focus:border-[#2596be]'
                              } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && (
                              <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg border ${
                                errors.cvv 
                                  ? 'border-[#622347] focus:border-[#622347]' 
                                  : 'border-[#ABAFB5] focus:border-[#2596be]'
                              } focus:ring-2 focus:ring-[#2596be]/20 outline-none transition`}
                              placeholder="123"
                              maxLength={4}
                            />
                            {errors.cvv && (
                              <p className="mt-2 text-sm text-[#622347] flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ABAFB5]/20">
                  <h2 className="text-xl font-bold text-[#0E1D21] mb-6">Order Summary</h2>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#0E1D21] truncate">{item.name}</p>
                          <p className="text-sm text-[#677E8A]">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-[#0E1D21] whitespace-nowrap ml-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Totals */}
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-[#677E8A]">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {/* Shipping Method */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#677E8A]">Shipping</span>
                        <select
                          name="shippingMethod"
                          value={formData.shippingMethod}
                          onChange={handleInputChange}
                          className="bg-transparent border border-[#ABAFB5] rounded px-2 py-1 text-sm focus:outline-none focus:border-[#2596be]"
                        >
                          {shippingMethods.map((method) => (
                            <option key={method.id} value={method.id}>
                              {method.name} ({method.cost})
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-xs text-[#677E8A]">
                        {shippingMethods.find(m => m.id === formData.shippingMethod)?.delivery}
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#677E8A]">Tax (8%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold border-t pt-4">
                      <span className="text-[#0E1D21]">Total</span>
                      <span className="text-[#2596be]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Prescription Verification */}
                {cartItems.some(item => item.requiresPrescription) && (
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ABAFB5]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="text-[#2596be]" size={24} />
                      <h3 className="font-bold text-[#0E1D21]">Prescription Verification</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="prescriptionVerified"
                          name="prescriptionVerified"
                          checked={formData.prescriptionVerified}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                        <div>
                          <label htmlFor="prescriptionVerified" className="font-medium text-[#0E1D21]">
                            I confirm I have a valid prescription for all prescription medications
                          </label>
                          <p className="text-sm text-[#677E8A] mt-1">
                            Required for: {cartItems.filter(item => item.requiresPrescription).map(item => item.name).join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      {formData.prescriptionVerified && (
                        <div className="space-y-4 p-4 bg-[#2596be]/5 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                              Doctor's Name
                            </label>
                            <input
                              type="text"
                              name="doctorName"
                              value={formData.doctorName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-lg border border-[#ABAFB5] focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none"
                              placeholder="Dr. Smith"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-[#0E1D21] mb-2">
                              License Number (Optional)
                            </label>
                            <input
                              type="text"
                              name="doctorLicense"
                              value={formData.doctorLicense}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-lg border border-[#ABAFB5] focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none"
                              placeholder="MD123456"
                            />
                          </div>
                        </div>
                      )}
                      
                      {errors.prescriptionVerified && (
                        <p className="text-sm text-[#622347] flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.prescriptionVerified}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Terms and Submit */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ABAFB5]/20">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="terms" className="font-medium text-[#0E1D21]">
                          I agree to the Terms & Conditions and Privacy Policy
                        </label>
                        <p className="text-sm text-[#677E8A] mt-1">
                          By placing this order, you agree to our terms of service.
                        </p>
                      </div>
                    </div>
                    
                    {/* Security Badge */}
                    <div className="flex items-center gap-3 p-3 bg-[#122E34]/5 rounded-lg">
                      <Lock className="text-[#2596be]" size={18} />
                      <div>
                        <p className="text-sm font-medium text-[#122E34]">Secure Payment</p>
                        <p className="text-xs text-[#677E8A]">256-bit SSL encryption</p>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#2596be] hover:bg-[#122E34] text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Lock size={20} />
                      Place Order
                      <ArrowLeft className="rotate-180" size={20} />
                    </button>
                    
                    <p className="text-center text-sm text-[#677E8A]">
                      You won't be charged until your order is verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}