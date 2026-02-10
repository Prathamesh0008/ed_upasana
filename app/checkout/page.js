"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import {
  User,
  MapPin,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Shield,
  Truck,
  Package,
  Phone,
  Mail,
  Home,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showAllInfo, setShowAllInfo] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Color palette
  const colors = {
    primary: "#2596be",
    secondary: "#ABAFB5",
    accent: "#677E8A",
    dark: "#622347",
    darkBlue: "#122E34",
    darkest: "#0E1D21",
  };

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [cartItems, router, orderPlaced]);

  // Safe price formatting function
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "0.00";
    }
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  // Calculate cart total safely
  const calculateSubtotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      const itemPrice = typeof price === 'string' ? parseFloat(price) : price;
      return total + (isNaN(itemPrice) ? 0 : itemPrice * quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  // Validation functions
  const validateName = (name) => {
    return /^[A-Za-z\s'-]+$/.test(name);
  };

  const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCardNumber = (cardNumber) => {
    const digitsOnly = cardNumber.replace(/\D/g, "");
    return digitsOnly.length === 16;
  };

  const validateExpiryDate = (expiryDate) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
  };

  const validateCVV = (cvv) => {
    const digitsOnly = cvv.replace(/\D/g, "");
    return digitsOnly.length === 3 || digitsOnly.length === 4;
  };

  const validateZipCode = (zipCode) => {
    return /^\d{5}(-\d{4})?$/.test(zipCode);
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      } else if (!validateName(formData.firstName)) {
        newErrors.firstName = "Name can only contain letters, spaces, hyphens, and apostrophes";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      } else if (!validateName(formData.lastName)) {
        newErrors.lastName = "Name can only contain letters, spaces, hyphens, and apostrophes";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    }

    if (stepNumber === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      } else if (!validateName(formData.city)) {
        newErrors.city = "City can only contain letters, spaces, hyphens, and apostrophes";
      }

      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      } else if (!validateName(formData.state)) {
        newErrors.state = "State can only contain letters, spaces, hyphens, and apostrophes";
      }

      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "ZIP code is required";
      } else if (!validateZipCode(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid 5-digit ZIP code";
      }
    }

    if (stepNumber === 3) {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!validateCardNumber(formData.cardNumber)) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      } else if (!validateName(formData.cardName)) {
        newErrors.cardName = "Name can only contain letters, spaces, hyphens, and apostrophes";
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!validateExpiryDate(formData.expiryDate)) {
        newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!validateCVV(formData.cvv)) {
        newErrors.cvv = "Please enter a valid 3 or 4-digit CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      
      let formatted = digitsOnly;
      if (digitsOnly.length > 0) {
        formatted = "(" + digitsOnly.substring(0, 3);
      }
      if (digitsOnly.length >= 4) {
        formatted = "(" + digitsOnly.substring(0, 3) + ") " + digitsOnly.substring(3, 6);
      }
      if (digitsOnly.length >= 7) {
        formatted = "(" + digitsOnly.substring(0, 3) + ") " + digitsOnly.substring(3, 6) + "-" + digitsOnly.substring(6, 10);
      }
      
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    }
    else if (name === "firstName" || name === "lastName" || name === "city" || name === "state" || name === "cardName") {
      if (value === "" || /^[A-Za-z\s'-]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
    else if (name === "cardNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      
      let formatted = digitsOnly;
      if (digitsOnly.length > 0) {
        formatted = digitsOnly.match(/.{1,4}/g)?.join(" ") || digitsOnly;
      }
      
      if (digitsOnly.length <= 16) {
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    }
    else if (name === "expiryDate") {
      const digitsOnly = value.replace(/\D/g, "");
      
      let formatted = digitsOnly;
      if (digitsOnly.length >= 2) {
        formatted = digitsOnly.substring(0, 2) + "/" + digitsOnly.substring(2, 4);
      }
      
      if (digitsOnly.length <= 4) {
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    }
    else if (name === "cvv") {
      const digitsOnly = value.replace(/\D/g, "");
      
      if (digitsOnly.length <= 4) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      }
    }
    else if (name === "zipCode") {
      const digitsOnly = value.replace(/\D/g, "");
      
      let formatted = digitsOnly;
      if (digitsOnly.length > 5) {
        formatted = digitsOnly.substring(0, 5) + "-" + digitsOnly.substring(5, 9);
      }
      
      if (digitsOnly.length <= 9) {
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const placeOrder = async () => {
    setIsLoading(true);
    
    // Validate all steps before placing order
    let isValid = true;
    
    if (!validateStep(1)) {
      isValid = false;
      setStep(1);
      setIsLoading(false);
      return;
    }
    
    if (!validateStep(2)) {
      isValid = false;
      setStep(2);
      setIsLoading(false);
      return;
    }
    
    if (!validateStep(3)) {
      isValid = false;
      setStep(3);
      setIsLoading(false);
      return;
    }
    
    if (isValid) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const orderId = `ORD-${Date.now().toString().slice(-8)}`;
        setOrderNumber(orderId);
        clearCart();
        setOrderPlaced(true);
        setFormSubmitted(true);
      } catch (error) {
        console.error("Order placement error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStepContinue = () => {
    if (step === 1 && validateStep(1)) {
      setStep(2);
    } else if (step === 2 && validateStep(2)) {
      setStep(3);
    } else if (step === 3 && validateStep(3)) {
      setStep(4);
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/cart");
    }
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    const digitsOnly = cardNumber.replace(/\D/g, "");
    const lastFour = digitsOnly.slice(-4);
    return lastFour ? "•••• •••• •••• " + lastFour : "•••• •••• •••• ••••";
  };

  const maskCVV = (cvv) => {
    if (!cvv) return "•••";
    return "•".repeat(cvv.length);
  };

  // Format phone number for display
  const formatPhone = (phone) => {
    if (!phone) return "";
    return phone;
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md border border-[#2596be]/20">
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-[#2596be] to-[#122E34] rounded-full blur-xl opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-r from-[#622347] to-[#122E34] rounded-full blur-xl opacity-20"></div>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center animate-pulse">
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase!</p>
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-xl border border-[#2596be]/30 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Package className="text-[#2596be]" size={24} />
              <p className="font-semibold text-gray-800">Order ID:</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-wider font-mono">{orderNumber}</p>
          </div>
          
          <div className="space-y-4 mb-8 text-left bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-[#677E8A]" size={20} />
              <h3 className="font-semibold text-gray-800">Order Details</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold text-gray-800">3-5 Business Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping to:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {formData.city}, {formData.state}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Contact:</span>
                <span className="font-semibold text-gray-800">{formatPhone(formData.phone)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-gray-600 text-lg">Total Amount:</span>
                <span className="font-bold text-xl bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                  ${formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => router.push("/products")}
            className="w-full bg-gradient-to-r from-[#2596be] to-[#122E34] text-white py-4 rounded-xl font-semibold hover:from-[#2596be] hover:to-[#0E1D21] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Continue Shopping
          </button>
          
          <p className="text-gray-600 text-sm mt-6">
            A confirmation email has been sent to{" "}
            <span className="text-[#2596be] font-semibold">{formData.email}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleStepBack}
            className="flex items-center gap-2 text-[#2596be] hover:text-[#677E8A] font-semibold mb-6 group transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back {step > 1 && `to Step ${step - 1}`}
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2596be] via-[#677E8A] to-[#122E34] bg-clip-text text-transparent mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">Complete your purchase in 4 easy steps</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-lg">
                  <ShoppingBag className="text-[#2596be]" size={20} />
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Items in Cart</p>
                  <p className="font-bold text-gray-900 text-xl">{cartItems.length}</p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                  ${formatPrice(total)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP INDICATOR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { number: 1, label: "Contact", icon: <User size={18} />, desc: "Your information", color: "from-[#2596be] to-[#677E8A]" },
            { number: 2, label: "Shipping", icon: <MapPin size={18} />, desc: "Delivery address", color: "from-[#622347] to-[#2596be]" },
            { number: 3, label: "Payment", icon: <CreditCard size={18} />, desc: "Payment method", color: "from-[#677E8A] to-[#122E34]" },
            { number: 4, label: "Review", icon: <Lock size={18} />, desc: "Confirm order", color: "from-[#2596be] to-[#622347]" },
          ].map((item) => (
            <button
              key={item.number}
              onClick={() => step >= item.number && setStep(item.number)}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${
                step === item.number
                  ? `bg-gradient-to-r ${item.color} border-white shadow-lg shadow-[#2596be]/20`
                  : step > item.number
                  ? "bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step === item.number
                  ? "bg-white/20 text-white"
                  : step > item.number
                  ? `bg-gradient-to-r ${item.color} text-white`
                  : "bg-gray-200 text-gray-600"
              }`}>
                {step > item.number ? <CheckCircle size={20} /> : item.icon}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    step === item.number ? "text-white" : step > item.number ? "text-gray-900" : "text-gray-600"
                  }`}>
                    Step {item.number}
                  </span>
                  <span className={`hidden md:inline text-sm ${
                    step === item.number ? "text-white" : "text-gray-700"
                  }`}>
                    {item.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 hidden md:block">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* STEP 1: Contact Info */}
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#2596be] to-[#677E8A] rounded-xl">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">
                        Contact Information
                      </h2>
                      <p className="text-gray-600">We'll use this to contact you about your order</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-[#2596be]">
                    <Shield size={16} />
                    <span>Secure form</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">First Name *</label>
                    <input
                      placeholder="John"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-xl bg-white border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } text-gray-900 placeholder-gray-500 focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Last Name *</label>
                    <input
                      placeholder="Doe"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-xl bg-white border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } text-gray-900 placeholder-gray-500 focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        placeholder="john@example.com"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-4 pl-12 rounded-xl bg-white border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number *</label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        placeholder="(555) 123-4567"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-4 pl-12 rounded-xl bg-white border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all`}
                      />
                    </div>
                    {errors.phone ? (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm mt-1">Enter 10-digit phone number</p>
                    )}
                  </div>
                </div>

                {/* Contact Info Preview */}
                {showAllInfo && (formData.firstName || formData.email) && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-[#2596be]/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                        Contact Information Preview
                      </h3>
                      <Eye className="text-[#2596be]" size={20} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-gray-900">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">{formData.email || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">{formatPhone(formData.phone) || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleStepContinue}
                  disabled={Object.keys(errors).some(key => errors[key])}
                  className={`mt-8 w-full ${
                    Object.keys(errors).some(key => errors[key])
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#2596be] hover:to-[#0E1D21] transform hover:-translate-y-0.5"
                  } text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-3`}
                >
                  Continue to Shipping
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* STEP 2: Shipping Address */}
            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#622347] to-[#2596be] rounded-xl">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#622347] to-[#122E34] bg-clip-text text-transparent">
                        Shipping Address
                      </h2>
                      <p className="text-gray-600">Where should we deliver your order?</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-[#622347]">
                    <Truck size={16} />
                    <span>Fast delivery</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">Street Address *</label>
                    <div className="relative">
                      <Home size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        placeholder="123 Main Street"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full p-4 pl-12 rounded-xl bg-white border ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:border-[#622347] focus:ring-2 focus:ring-[#622347]/20 outline-none transition-all`}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">City *</label>
                    <input
                      placeholder="New York"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-xl bg-white border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } text-gray-900 placeholder-gray-500 focus:border-[#622347] focus:ring-2 focus:ring-[#622347]/20 outline-none transition-all`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">State *</label>
                    <input
                      placeholder="NY"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-xl bg-white border ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      } text-gray-900 placeholder-gray-500 focus:border-[#622347] focus:ring-2 focus:ring-[#622347]/20 outline-none transition-all`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">ZIP Code *</label>
                    <input
                      placeholder="10001"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-xl bg-white border ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      } text-gray-900 placeholder-gray-500 focus:border-[#622347] focus:ring-2 focus:ring-[#622347]/20 outline-none transition-all`}
                    />
                    {errors.zipCode ? (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.zipCode}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm mt-1">Enter 5-digit ZIP code</p>
                    )}
                  </div>
                </div>

                {/* Shipping Preview */}
                {showAllInfo && (
                  <div className="mt-8 space-y-4">
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-[#622347]/30">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold bg-gradient-to-r from-[#622347] to-[#2596be] bg-clip-text text-transparent">
                          Shipping Address Preview
                        </h3>
                        <MapPin className="text-[#622347]" size={20} />
                      </div>
                      <p className="text-gray-900 font-medium">{formData.address || "Not provided"}</p>
                      <p className="text-gray-600">
                        {formData.city || "City"}, {formData.state || "State"} {formData.zipCode || "ZIP"}
                      </p>
                    </div>
                    
                    {formData.firstName && (
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-[#2596be]/30">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                            Contact Information
                          </h3>
                          <User className="text-[#2596be]" size={20} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">{formData.email}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleStepContinue}
                  disabled={Object.keys(errors).some(key => errors[key])}
                  className={`mt-8 w-full ${
                    Object.keys(errors).some(key => errors[key])
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#622347] to-[#122E34] hover:from-[#622347] hover:to-[#0E1D21] transform hover:-translate-y-0.5"
                  } text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-3`}
                >
                  Continue to Payment
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#677E8A] to-[#122E34] rounded-xl">
                      <CreditCard size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#677E8A] to-[#122E34] bg-clip-text text-transparent">
                        Payment Details
                      </h2>
                      <p className="text-gray-600">Secure payment processing</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-[#677E8A]">
                    <Shield size={16} />
                    <span>256-bit encrypted</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Card Number *</label>
                    <div className="relative">
                      <CreditCard size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        placeholder="1234 5678 9012 3456"
                        name="cardNumber"
                        value={showCardDetails ? formData.cardNumber : maskCardNumber(formData.cardNumber)}
                        onChange={handleChange}
                        type={showCardDetails ? "text" : "password"}
                        className={`w-full p-4 pl-12 pr-12 rounded-xl bg-white border ${
                          errors.cardNumber ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:border-[#677E8A] focus:ring-2 focus:ring-[#677E8A]/20 outline-none transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCardDetails(!showCardDetails)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showCardDetails ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.cardNumber ? (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.cardNumber}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm mt-1">Enter 16-digit card number</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Cardholder Name *</label>
                    <input
                      placeholder="JOHN DOE"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-xl bg-white border ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      } text-gray-900 placeholder-gray-500 focus:border-[#677E8A] focus:ring-2 focus:ring-[#677E8A]/20 outline-none transition-all`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Expiry Date (MM/YY) *</label>
                      <input
                        placeholder="12/25"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className={`w-full p-4 rounded-xl bg-white border ${
                          errors.expiryDate ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:border-[#677E8A] focus:ring-2 focus:ring-[#677E8A]/20 outline-none transition-all`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <span className="text-red-500">•</span>
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">CVV *</label>
                      <div className="relative">
                        <input
                          placeholder="123"
                          name="cvv"
                          value={showCardDetails ? formData.cvv : maskCVV(formData.cvv)}
                          onChange={handleChange}
                          type={showCardDetails ? "text" : "password"}
                          className={`w-full p-4 rounded-xl bg-white border ${
                            errors.cvv ? "border-red-500" : "border-gray-300"
                          } text-gray-900 placeholder-gray-500 focus:border-[#677E8A] focus:ring-2 focus:ring-[#677E8A]/20 outline-none transition-all`}
                        />
                      </div>
                      {errors.cvv ? (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <span className="text-red-500">•</span>
                          {errors.cvv}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-sm mt-1">3 or 4-digit security code</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* All Information Preview */}
                {showAllInfo && (
                  <div className="mt-8 space-y-4">
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-[#677E8A]/30">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold bg-gradient-to-r from-[#677E8A] to-[#122E34] bg-clip-text text-transparent">
                          Payment Method
                        </h3>
                        <CreditCard className="text-[#677E8A]" size={20} />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Card Number</span>
                          <span className="font-semibold text-gray-900 font-mono">
                            {showCardDetails ? formData.cardNumber : maskCardNumber(formData.cardNumber)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Cardholder</span>
                          <span className="font-semibold text-gray-900">{formData.cardName || "Not provided"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Expires</span>
                          <span className="font-semibold text-gray-900">{formData.expiryDate || "Not provided"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-[#2596be]/30">
                        <p className="text-sm text-gray-600">Shipping Address</p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {formData.address}, {formData.city}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-gray-50 rounded-xl border border-[#622347]/30">
                        <p className="text-sm text-gray-600">Contact</p>
                        <p className="font-semibold text-gray-900 text-sm">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleStepContinue}
                  disabled={Object.keys(errors).some(key => errors[key])}
                  className={`mt-8 w-full ${
                    Object.keys(errors).some(key => errors[key])
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#677E8A] to-[#122E34] hover:from-[#677E8A] hover:to-[#0E1D21] transform hover:-translate-y-0.5"
                  } text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-3`}
                >
                  Review Order
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#2596be] to-[#622347] rounded-xl">
                      <Lock size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2596be] via-[#622347] to-[#122E34] bg-clip-text text-transparent">
                        Review & Place Order
                      </h2>
                      <p className="text-gray-600">Review all information before confirming</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary Preview */}
                <div className="mb-8 space-y-6">
                  {/* Contact Information */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-[#2596be]/30">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="text-[#2596be]" size={20} />
                      <h3 className="font-bold text-lg bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                        Contact Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">{formatPhone(formData.phone)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-[#622347]/30">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="text-[#622347]" size={20} />
                      <h3 className="font-bold text-lg bg-gradient-to-r from-[#622347] to-[#2596be] bg-clip-text text-transparent">
                        Shipping Address
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900 text-lg">{formData.address}</p>
                      <p className="text-gray-600">
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Truck size={16} className="text-[#677E8A]" />
                        <span className="text-sm text-gray-600">Estimated delivery: 3-5 business days</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-[#677E8A]/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-[#677E8A]" size={20} />
                        <h3 className="font-bold text-lg bg-gradient-to-r from-[#677E8A] to-[#122E34] bg-clip-text text-transparent">
                          Payment Method
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowCardDetails(!showCardDetails)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        {showCardDetails ? <EyeOff size={16} className="text-gray-600" /> : <Eye size={16} className="text-gray-600" />}
                        <span className="text-sm text-gray-600">
                          {showCardDetails ? "Hide" : "Show"} Details
                        </span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Card Number</span>
                        <span className="font-semibold text-gray-900 font-mono">
                          {showCardDetails ? formData.cardNumber : maskCardNumber(formData.cardNumber)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cardholder Name</span>
                        <span className="font-semibold text-gray-900">{formData.cardName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Expiry Date</span>
                        <span className="font-semibold text-gray-900">{formData.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-[#2596be]/30 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">
                      Order Total
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                      ${formatPrice(total)}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className={shipping === 0 ? "text-[#2596be] font-semibold" : "text-gray-900"}>
                        {shipping === 0 ? "FREE" : `$${formatPrice(shipping)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="text-gray-900">${formatPrice(tax)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-[#2596be] via-[#622347] to-[#122E34] text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1 text-lg group ${
                    isLoading ? "opacity-80 cursor-not-allowed" : "hover:opacity-90"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={22} className="group-hover:scale-110 transition-transform" />
                      <span>Place Secure Order • ${formatPrice(total)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600">
                  <Shield size={16} className="text-[#2596be]" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Order Summary */}
          <div className="space-y-8">
            {/* Order Summary Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                  Order Summary
                </h3>
                <Package className="text-[#2596be]" size={24} />
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-gray-600">Your cart is empty</p>
                    <button
                      onClick={() => router.push("/products")}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white rounded-lg text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const safePrice = item.price || 0;
                    const price = typeof safePrice === 'string' ? parseFloat(safePrice) : safePrice;
                    const itemPrice = isNaN(price) ? 0 : price;
                    const quantity = item.quantity || 1;
                    const itemTotal = itemPrice * quantity;
                    
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#2596be]/20 to-[#122E34]/20 rounded-lg flex items-center justify-center group-hover:from-[#2596be]/30 group-hover:to-[#122E34]/30 transition-all">
                            <span className="font-bold text-[#2596be]">{quantity}</span>
                          </div>
                          <div className="max-w-[140px]">
                            <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                            <p className="text-xs text-gray-600">${formatPrice(itemPrice)} each</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${formatPrice(itemTotal)}</p>
                          {quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              {quantity} × ${formatPrice(itemPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-[#2596be] font-semibold" : ""}>
                    {shipping === 0 ? "FREE" : `$${formatPrice(shipping)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${formatPrice(tax)}</span>
                </div>
                <hr className="my-3 border-gray-300" />
                <div className="flex justify-between items-center text-lg font-bold pt-2">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-2xl bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                    ${formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Checkout Progress</span>
                  <span className="font-semibold text-[#2596be]">{step}/4 Steps</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#2596be] to-[#622347] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Information Toggle */}
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-xl border border-[#2596be]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg bg-gradient-to-r from-[#2596be] to-[#677E8A] bg-clip-text text-transparent">
                  Information Display
                </h3>
                <button
                  onClick={() => setShowAllInfo(!showAllInfo)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {showAllInfo ? <EyeOff size={18} className="text-gray-600" /> : <Eye size={18} className="text-gray-600" />}
                  <span className="text-sm text-gray-600">
                    {showAllInfo ? "Hide Information" : "Show Information"}
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {showAllInfo
                  ? "All entered information is currently visible for review."
                  : "Information is hidden for privacy. Click 'Show Information' to review."}
              </p>
            </div>

            {/* Security Badge */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-xl border border-[#2596be]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-[#2596be]/20 to-[#122E34]/20 rounded-lg">
                  <Shield size={20} className="text-[#2596be]" />
                </div>
                <div>
                  <h3 className="font-bold bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">
                    Secure Checkout
                  </h3>
                  <p className="text-xs text-gray-600">256-bit SSL encryption</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your payment information is encrypted and secure. We never store your full card details on our servers.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="px-3 py-2 bg-white rounded-lg text-center border border-gray-300">
                  <p className="text-xs text-gray-600">PCI DSS</p>
                  <p className="text-xs font-semibold text-[#2596be]">Compliant</p>
                </div>
                <div className="px-3 py-2 bg-white rounded-lg text-center border border-gray-300">
                  <p className="text-xs text-gray-600">SSL</p>
                  <p className="text-xs font-semibold text-[#2596be]">256-bit</p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl shadow-xl border border-[#622347]/20">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={20} className="text-[#622347]" />
                <h3 className="font-bold bg-gradient-to-r from-[#622347] to-[#2596be] bg-clip-text text-transparent">
                  Shipping Information
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Delivery Time</span>
                  <span className="font-semibold text-gray-900 text-sm">3-5 business days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Shipping Cost</span>
                  <span className={`text-sm font-semibold ${shipping === 0 ? "text-[#2596be]" : "text-gray-900"}`}>
                    {shipping === 0 ? "FREE" : `$${formatPrice(shipping)}`}
                  </span>
                </div>
                {subtotal < 50 && (
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-[#2596be]/30">
                    <p className="text-xs text-center text-[#2596be]">
                      Add ${formatPrice(50 - subtotal)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #2596be, #677E8A);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2596be, #122E34);
        }
      `}</style>
    </div>
  );
}