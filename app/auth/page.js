'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Sparkles,
  Shield,
  Heart,
  Pill,
  Building
} from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true,
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [authError, setAuthError] = useState('');

  // Benefits data for the side panel
  const benefits = [
    { icon: Shield, title: "Secure Platform", description: "HIPAA compliant data protection" },
    { icon: Heart, title: "Health Tracking", description: "Monitor your prescriptions & health" },
    { icon: Pill, title: "Smart Reminders", description: "Never miss your medication" },
    { icon: Building, title: "Trusted Partners", description: "Connected with certified pharmacies" },
  ];

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return '';
    const digitsOnly = phone.replace(/\D/g, '');
    if (!/^\d+$/.test(digitsOnly)) return 'Phone number can only contain digits';
    if (digitsOnly.length < 7) return 'Phone number must be at least 7 digits';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (name === 'firstName' || name === 'lastName') {
      setErrors(prev => ({ ...prev, [name]: validateName(value) }));
    } else if (name === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'phone') {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
    } else if (name === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    } else if (name === 'confirmPassword') {
      setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    if (name === 'firstName' || name === 'lastName') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'phone') {
      processedValue = value.replace(/\D/g, '');
      if (value.startsWith('+')) {
        processedValue = '+' + value.slice(1).replace(/\D/g, '');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    if (errors[name] && touched[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'password' && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateConfirmPassword(formData.confirmPassword)
      }));
    }
    
    if (authError) setAuthError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isLogin) {
      newErrors.email = validateEmail(formData.email);
      newErrors.password = validatePassword(formData.password);
    } else {
      newErrors.firstName = validateName(formData.firstName);
      newErrors.lastName = validateName(formData.lastName);
      newErrors.email = validateEmail(formData.email);
      newErrors.phone = validatePhone(formData.phone);
      newErrors.password = validatePassword(formData.password);
      newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword);
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const touchedFields = isLogin 
      ? { email: true, password: true }
      : {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          password: true,
          confirmPassword: true,
          acceptTerms: true,
        };
    
    setTouched(touchedFields);
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`${isLogin ? 'Login' : 'Registration'} successful:`, formData);
      
      setAuthSuccess(true);
      
      setTimeout(() => {
        router.push('/account');
      }, 2000);
    } catch (error) {
      setAuthError(isLogin 
        ? 'Invalid email or password. Please try again.'
        : 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      score,
      label: labels[score - 1] || '',
      color: colors[score - 1] || '',
    };
  };

  const strength = passwordStrength(formData.password);

  const switchMode = () => {
    setIsLogin(!isLogin);
    setAuthSuccess(false);
    setAuthError('');
    setErrors({});
    setTouched({});
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left Panel - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#122E34] via-[#1A4750] to-[#2596be] p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          </div>
          
          <div className="relative z-10 w-full">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-colors">
                <span className="text-white font-bold text-2xl">EP</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-white">Ed</span>
                <span className="text-3xl font-bold text-[#2596be]">Pharma</span>
              </div>
            </Link>
            
            {/* Content */}
            <div className="mt-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-medium">Trusted Healthcare Platform</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                {isLogin ? 'Welcome Back!' : 'Join Our Healthcare Community'}
              </h1>
              
              <p className="text-white/80 text-lg mb-12 max-w-md">
                {isLogin 
                  ? 'Access your personalized healthcare dashboard and manage your prescriptions securely.'
                  : 'Start your journey to better health with personalized medication management and trusted pharmacy connections.'
                }
              </p>
              
              {/* Benefits List */}
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-white/70">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-white/70 text-sm">Patients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100+</div>
                  <div className="text-white/70 text-sm">Pharmacy Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/70 text-sm">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">EP</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#0E1D21]">Ed</span>
                  <span className="text-2xl font-bold text-[#2596be]">Pharma</span>
                </div>
              </Link>
            </div>

            {/* Auth Card */}
            <div className="bg-white rounded-2xl border border-[#ABAFB5]/20 shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="p-8">
                {/* Mode Toggle */}
                <div className="flex mb-8">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 text-center font-semibold transition-all ${
                      isLogin 
                        ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-md' 
                        : 'text-[#677E8A] hover:text-[#2596be]'
                    } rounded-l-xl`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 text-center font-semibold transition-all ${
                      !isLogin 
                        ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-md' 
                        : 'text-[#677E8A] hover:text-[#2596be]'
                    } rounded-r-xl`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Success Message */}
                {authSuccess ? (
                  <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      {isLogin ? 'Welcome Back!' : 'Account Created!'}
                    </h3>
                    <p className="text-green-700">
                      {isLogin 
                        ? 'Redirecting to your dashboard...' 
                        : 'Welcome to EdPharma. Redirecting...'
                      }
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Error Message */}
                    {authError && (
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600">{authError}</p>
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name Fields (Register only) */}
                      {!isLogin && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#0E1D21]">
                              First Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                              <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full rounded-xl border ${
                                  touched.firstName && errors.firstName ? 'border-red-400' : 'border-[#ABAFB5]'
                                } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                                placeholder="John"
                              />
                            </div>
                            {touched.firstName && errors.firstName && (
                              <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.firstName}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#0E1D21]">
                              Last Name
                            </label>
                            <input
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full rounded-xl border ${
                                touched.lastName && errors.lastName ? 'border-red-400' : 'border-[#ABAFB5]'
                              } bg-white px-4 py-3 text-[#0E1D21] placeholder:text-[#677E8A] outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                              placeholder="Doe"
                            />
                            {touched.lastName && errors.lastName && (
                              <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0E1D21]">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-xl border ${
                              touched.email && errors.email ? 'border-red-400' : 'border-[#ABAFB5]'
                            } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                            placeholder="you@example.com"
                          />
                        </div>
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone (Register only) */}
                      {!isLogin && (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0E1D21]">
                            Phone <span className="font-normal text-[#677E8A]">(Optional)</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                            <input
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full rounded-xl border ${
                                touched.phone && errors.phone ? 'border-red-400' : 'border-[#ABAFB5]'
                              } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                              placeholder="1234567890"
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.phone}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Password */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-semibold text-[#0E1D21]">
                            Password
                          </label>
                          {isLogin && (
                            <Link 
                              href="/forgot-password" 
                              className="text-sm font-medium bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent hover:opacity-80"
                            >
                              Forgot password?
                            </Link>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                          <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-xl border ${
                              touched.password && errors.password ? 'border-red-400' : 'border-[#ABAFB5]'
                            } bg-white px-4 py-3 pl-10 pr-10 text-[#0E1D21] placeholder:text-[#677E8A] outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#677E8A] hover:text-[#2596be]"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        
                        {/* Password Strength (Register only) */}
                        {!isLogin && formData.password && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#677E8A]">Password strength</span>
                              <span className={`font-semibold ${
                                strength.score <= 2 ? 'text-red-500' :
                                strength.score === 3 ? 'text-yellow-500' : 'text-green-500'
                              }`}>
                                {strength.label}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
                                style={{ width: `${(strength.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {touched.password && errors.password && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password (Register only) */}
                      {!isLogin && (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0E1D21]">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                            <input
                              name="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full rounded-xl border ${
                                touched.confirmPassword && errors.confirmPassword ? 'border-red-400' : 'border-[#ABAFB5]'
                              } bg-white px-4 py-3 pl-10 pr-10 text-[#0E1D21] placeholder:text-[#677E8A] outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#677E8A] hover:text-[#2596be]"
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {touched.confirmPassword && errors.confirmPassword && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Terms & Remember Me */}
                      <div className="space-y-3">
                        {isLogin ? (
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              checked={formData.rememberMe}
                              onChange={handleChange}
                              className="h-4 w-4 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]/20"
                            />
                            <span className="ml-2 text-sm text-[#677E8A]">Remember me</span>
                          </label>
                        ) : (
                          <>
                            <label className="flex items-start cursor-pointer">
                              <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-4 w-4 mt-0.5 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]/20"
                              />
                              <span className="ml-2 text-sm text-[#677E8A]">
                                I agree to the{' '}
                                <Link href="/terms" className="text-[#2596be] hover:underline font-medium">
                                  Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-[#2596be] hover:underline font-medium">
                                  Privacy Policy
                                </Link>
                              </span>
                            </label>
                            {touched.acceptTerms && errors.acceptTerms && (
                              <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.acceptTerms}
                              </p>
                            )}
                            
                            <label className="flex items-start cursor-pointer">
                              <input
                                type="checkbox"
                                name="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                className="h-4 w-4 mt-0.5 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]/20"
                              />
                              <span className="ml-2 text-sm text-[#677E8A]">
                                Subscribe to healthcare tips and updates
                              </span>
                            </label>
                          </>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full rounded-xl bg-gradient-to-r from-[#2596be] via-[#2596be]/90 to-[#2596be] px-5 py-4 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                      >
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                        <span className="relative flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              {isLogin ? 'Signing In...' : 'Creating Account...'}
                            </>
                          ) : (
                            <>
                              {isLogin ? 'Sign In' : 'Create Account'}
                              <ArrowRight className="h-5 w-5" />
                            </>
                          )}
                        </span>
                      </button>

                      {/* Divider */}
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#ABAFB5]/30"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-white text-sm text-[#677E8A]">Or continue with</span>
                        </div>
                      </div>

                      {/* Social Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => console.log('Social login')}
                          className="flex items-center justify-center gap-3 px-4 py-3 border border-[#ABAFB5] rounded-xl text-sm font-medium text-[#0E1D21] hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-colors"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google
                        </button>
                        <button
                          type="button"
                          onClick={() => console.log('Social login')}
                          className="flex items-center justify-center gap-3 px-4 py-3 border border-[#ABAFB5] rounded-xl text-sm font-medium text-[#0E1D21] hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-colors"
                        >
                          <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Card Footer */}
              <div className="bg-gradient-to-r from-[#2596be]/5 via-[#2596be]/5 to-[#122E34]/5 border-t border-[#ABAFB5]/20 p-6 text-center">
                <p className="text-[#677E8A]">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    onClick={switchMode}
                    className="font-bold bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    {isLogin ? 'Sign up now' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-[#677E8A] hover:text-[#2596be] transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}