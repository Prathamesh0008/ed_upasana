'use client';

import { useState, useEffect } from 'react'; // Make sure useEffect is imported
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
  User, Mail, Phone, MapPin, Calendar, Shield, Bell,
  Heart, Pill, Clock, Package, Settings, LogOut, Edit,
  CheckCircle, AlertCircle, ChevronRight, CreditCard,
  FileText, Star, Lock, Globe, Users, Activity, Eye,
  Download, Share2, MessageSquare, HelpCircle, Home,
  ShoppingCart, FileSearch, HeartPulse, CreditCardIcon
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Handle redirect in useEffect
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleEditProfile = () => {
    router.push('/account/edit');
  };

  const handleIconClick = (action, data) => {
    switch (action) {
      case 'view_profile':
        alert(`Viewing profile of ${user?.firstName} ${user?.lastName}`);
        break;
      case 'send_email':
        window.location.href = `mailto:${user?.email}`;
        break;
      case 'call_phone':
        window.location.href = `tel:${user?.phone}`;
        break;
      case 'view_address':
        alert(`Address: ${user?.address}`);
        break;
      case 'view_calendar':
        alert(`Date of Birth: ${user?.dateOfBirth}`);
        break;
      case 'download_data':
        alert('Downloading health data...');
        break;
      case 'share_profile':
        alert('Sharing profile...');
        break;
      case 'view_medical_history':
        router.push('/medical-history');
        break;
      case 'contact_support':
        router.push('/support');
        break;
      case 'manage_subscription':
        router.push('/subscription');
        break;
      case 'view_orders':
        router.push('/orders');
        break;
      case 'view_prescriptions':
        router.push('/prescriptions');
        break;
      case 'health_tracker':
        router.push('/health-tracker');
        break;
      case 'payment_methods':
        router.push('/payment-methods');
        break;
      default:
        console.log(`Action: ${action}`, data);
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Show loading from auth context
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center mb-4 animate-pulse">
            <User className="h-8 w-8 text-[#2596be]" />
          </div>
          <p className="text-[#677E8A]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, return null (redirection handled by useEffect)
  if (!user) {
    return null;
  }

  // Mock user data - In real app, this would come from your API/backend
  const userData = {
    ...user,
    address: user.address || '123 Health Street, Suite 500\nMedical City, MC 12345',
    dateOfBirth: user.dateOfBirth || '1990-05-15',
    membershipLevel: user.membershipLevel || 'Premium',
    memberSince: user.memberSince || '2023-01-15',
    lastLogin: user.lastLogin || 'Just now',
    healthData: {
      bloodType: user.healthData?.bloodType || 'O+',
      allergies: user.healthData?.allergies || ['Penicillin', 'Peanuts'],
      conditions: user.healthData?.conditions || ['Hypertension'],
      primaryDoctor: user.healthData?.primaryDoctor || 'Dr. Sarah Chen'
    },
    subscription: {
      plan: user.subscription?.plan || 'Annual Premium',
      status: user.subscription?.status || 'active',
      renewalDate: user.subscription?.renewalDate || '2024-12-15',
      autoRenew: user.subscription?.autoRenew || true
    },
    stats: {
      totalOrders: user.stats?.totalOrders || 24,
      activePrescriptions: user.stats?.activePrescriptions || 3,
      consultations: user.stats?.consultations || 8,
      loyaltyPoints: user.stats?.loyaltyPoints || 1250
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, action: 'view_profile' },
    { id: 'health', label: 'Health Data', icon: Heart, action: 'view_medical_history' },
    { id: 'orders', label: 'Orders', icon: Package, action: 'view_orders' },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill, action: 'view_prescriptions' },
    { id: 'security', label: 'Security', icon: Shield, action: 'security_settings' },
    { id: 'settings', label: 'Settings', icon: Settings, action: 'account_settings' },
  ];

  const quickActions = [
    { icon: Pill, label: 'Order Meds', href: '/products', color: 'from-[#2596be] to-[#122E34]' },
    { icon: Users, label: 'Consult Doctor', href: '/consultation', color: 'from-[#2596be] to-[#0E1D21]' },
    { icon: FileText, label: 'Prescriptions', href: '/prescriptions', color: 'from-[#122E34] to-[#2596be]' },
    { icon: Star, label: 'Support', href: '/support', color: 'from-[#0E1D21] to-[#2596be]' },
    { icon: HeartPulse, label: 'Health Tracker', href: '/health-tracker', color: 'from-[#2596be] to-[#0E1D21]' },
    { icon: ShoppingCart, label: 'My Cart', href: '/cart', color: 'from-[#122E34] to-[#2596be]' },
    { icon: FileSearch, label: 'Order History', href: '/orders', color: 'from-[#2596be] to-[#122E34]' },
    { icon: CreditCardIcon, label: 'Payment', href: '/payment', color: 'from-[#0E1D21] to-[#2596be]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
              >
                <User className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">My Account</h1>
                <p className="text-white/80 text-xs">Welcome, {userData.firstName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => handleIconClick('view_profile')}
              >
                <span className="text-white font-bold text-xl">
                  {userData.firstName?.[0]}{userData.lastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Account</h1>
                <p className="text-white/80 text-sm">Welcome back, {userData.firstName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleEditProfile}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-white hover:bg-white/20 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-white hover:bg-white/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="absolute left-0 top-0 h-full w-3/4 bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0E1D21]">Menu</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#677E8A]">
                    ✕
                  </button>
                </div>
                
                {/* Mobile User Info */}
                <div className="text-center mb-6">
                  <div 
                    className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center mb-4 relative cursor-pointer"
                    onClick={() => handleIconClick('view_profile')}
                  >
                    {userData.avatar ? (
                      <img src={userData.avatar} alt={userData.firstName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-2xl font-bold">
                        {userData.firstName?.[0]}{userData.lastName?.[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#0E1D21]">
                    {userData.firstName} {userData.lastName}
                  </h3>
                  <p className="text-[#677E8A] text-sm">{userData.email}</p>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-1 mb-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 border border-[#2596be]/20 text-[#122E34]'
                            : 'text-[#677E8A] hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{tab.label}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          activeTab === tab.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.slice(0, 4).map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <action.icon className="h-5 w-5 text-[#2596be] mb-1" />
                      <span className="text-xs font-medium text-[#0E1D21] text-center">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Left Sidebar - Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-6 sticky top-8">
              {/* User Info Card */}
              <div className="text-center mb-6">
                <div 
                  className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center mb-4 relative cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleIconClick('view_profile')}
                >
                  {userData.avatar ? (
                    <img src={userData.avatar} alt={userData.firstName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white text-3xl font-bold">
                      {userData.firstName?.[0]}{userData.lastName?.[0]}
                    </span>
                  )}
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-[#0E1D21]">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p 
                  className="text-[#677E8A] text-sm cursor-pointer hover:text-[#2596be] transition-colors"
                  onClick={() => handleIconClick('send_email')}
                >
                  {userData.email}
                </p>
                
                <div 
                  className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 border border-[#2596be]/20 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleIconClick('manage_subscription')}
                >
                  <Shield className="h-3 w-3 text-[#2596be]" />
                  <span className="text-sm font-medium text-[#122E34]">{userData.membershipLevel}</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 border border-[#2596be]/20 text-[#122E34]'
                          : 'text-[#677E8A] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        activeTab === tab.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-[#ABAFB5]/20">
                <h3 className="text-sm font-semibold text-[#0E1D21] mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleIconClick('view_orders')}
                  >
                    <span className="text-sm text-[#677E8A]">Total Orders</span>
                    <span className="text-[#122E34] font-semibold">{userData.stats.totalOrders}</span>
                  </div>
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleIconClick('view_prescriptions')}
                  >
                    <span className="text-sm text-[#677E8A]">Active Prescriptions</span>
                    <span className="text-[#122E34] font-semibold">{userData.stats.activePrescriptions}</span>
                  </div>
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleIconClick('health_tracker')}
                  >
                    <span className="text-sm text-[#677E8A]">Loyalty Points</span>
                    <span className="text-[#122E34] font-semibold">{userData.stats.loyaltyPoints}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0E1D21]">Personal Information</h2>
                    <button
                      onClick={handleEditProfile}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#2596be] hover:text-[#122E34] transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Information
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Clickable Info Items */}
                    {[
                      { icon: User, label: 'Full Name', value: `${userData.firstName} ${userData.lastName}`, action: 'view_profile' },
                      { icon: Mail, label: 'Email Address', value: userData.email, action: 'send_email' },
                      { icon: Phone, label: 'Phone Number', value: userData.phone, action: 'call_phone' },
                      { icon: Calendar, label: 'Date of Birth', value: userData.dateOfBirth, action: 'view_calendar' },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all cursor-pointer group"
                        onClick={() => handleIconClick(item.action)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center group-hover:from-[#2596be] group-hover:to-[#122E34] transition-all">
                          <item.icon className="h-5 w-5 text-[#2596be] group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm text-[#677E8A]">{item.label}</p>
                          <p className="text-sm sm:text-base font-semibold text-[#0E1D21] group-hover:text-[#122E34] transition-colors">
                            {item.value}
                          </p>
                        </div>
                        <Eye className="h-4 w-4 text-[#677E8A] group-hover:text-[#2596be] transition-colors" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-[#ABAFB5]/20">
                    <div 
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all cursor-pointer group"
                      onClick={() => handleIconClick('view_address')}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center group-hover:from-[#2596be] group-hover:to-[#122E34] transition-all">
                        <MapPin className="h-5 w-5 text-[#2596be] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-[#677E8A]">Address</p>
                        <p className="text-sm sm:text-base font-semibold text-[#0E1D21] group-hover:text-[#122E34] transition-colors whitespace-pre-line">
                          {userData.address}
                        </p>
                      </div>
                      <Eye className="h-4 w-4 text-[#677E8A] group-hover:text-[#2596be] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Subscription Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0E1D21]">Subscription</h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userData.subscription.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userData.subscription.status}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-[#677E8A]">Current Plan</p>
                          <p className="text-lg sm:text-xl font-bold text-[#0E1D21]">{userData.subscription.plan}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#677E8A]">Renewal Date</p>
                          <p className="text-base sm:text-lg font-semibold text-[#122E34]">{userData.subscription.renewalDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        userData.subscription.autoRenew ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <span className="text-sm text-[#677E8A]">
                        Auto-renewal is {userData.subscription.autoRenew ? 'enabled' : 'disabled'}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        className="flex-1 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] px-4 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
                        onClick={() => handleIconClick('manage_subscription')}
                      >
                        Upgrade Plan
                      </button>
                      <button 
                        className="flex-1 rounded-xl border border-[#2596be] px-4 py-3 text-[#2596be] font-semibold hover:bg-[#2596be]/5 transition-colors"
                        onClick={() => handleIconClick('view_subscription_details')}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Activity */}
                <div className="bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0E1D21] mb-6">Account Activity</h2>
                  
                  <div className="space-y-4">
                    <div 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleIconClick('view_login_history')}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-[#2596be]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#0E1D21]">Last Login</p>
                          <p className="text-sm text-[#677E8A]">{userData.lastLogin}</p>
                        </div>
                      </div>
                      <span className="text-sm text-[#2596be] font-medium">Successful</span>
                    </div>
                    
                    <div 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleIconClick('view_account_history')}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-[#2596be]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#0E1D21]">Member Since</p>
                          <p className="text-sm text-[#677E8A]">{userData.memberSince}</p>
                        </div>
                      </div>
                      <span className="text-sm text-[#2596be] font-medium">
                        {Math.floor((new Date() - new Date(userData.memberSince)) / (1000 * 60 * 60 * 24 * 365))} year(s)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Health Data Tab */}
            {activeTab === 'health' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0E1D21]">Health Information</h2>
                    <div className="flex gap-2">
                      <button 
                        className="inline-flex items-center gap-2 rounded-xl border border-[#2596be] px-3 py-2 text-sm text-[#2596be] hover:bg-[#2596be]/5 transition-colors"
                        onClick={() => handleIconClick('download_data')}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                      <button 
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] px-3 py-2 text-sm text-white hover:opacity-90 transition-opacity"
                        onClick={() => handleIconClick('share_profile')}
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4">
                      <div 
                        className="p-4 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleIconClick('view_blood_type')}
                      >
                        <p className="text-sm text-[#677E8A]">Blood Type</p>
                        <p className="text-2xl font-bold text-[#122E34]">{userData.healthData.bloodType}</p>
                      </div>
                      
                      <div 
                        className="p-4 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleIconClick('view_primary_doctor')}
                      >
                        <p className="text-sm text-[#677E8A]">Primary Doctor</p>
                        <p className="text-lg font-semibold text-[#0E1D21]">{userData.healthData.primaryDoctor}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div 
                        className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleIconClick('view_allergies')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-red-600 font-medium">Allergies</p>
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="space-y-2">
                          {userData.healthData.allergies.map((allergy, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-red-500" />
                              <span className="text-[#0E1D21]">{allergy}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div 
                        className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleIconClick('view_conditions')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-amber-700 font-medium">Medical Conditions</p>
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className="space-y-2">
                          {userData.healthData.conditions.map((condition, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-amber-500" />
                              <span className="text-[#0E1D21]">{condition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0E1D21] mb-6">Security Settings</h2>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        icon: Lock, 
                        title: 'Password', 
                        description: 'Last changed 30 days ago', 
                        action: 'change_password',
                        buttonText: 'Change'
                      },
                      { 
                        icon: Bell, 
                        title: 'Two-Factor Authentication', 
                        description: 'Add an extra layer of security', 
                        action: 'enable_2fa',
                        buttonText: 'Enable',
                        primary: true
                      },
                      { 
                        icon: Globe, 
                        title: 'Active Sessions', 
                        description: 'View and manage your logged-in devices', 
                        action: 'manage_sessions',
                        buttonText: 'Manage'
                      },
                      { 
                        icon: Shield, 
                        title: 'Privacy Settings', 
                        description: 'Control your data sharing preferences', 
                        action: 'privacy_settings',
                        buttonText: 'Configure'
                      },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleIconClick(item.action)}
                      >
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-[#2596be]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#0E1D21]">{item.title}</p>
                            <p className="text-sm text-[#677E8A]">{item.description}</p>
                          </div>
                        </div>
                        <button 
                          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                            item.primary 
                              ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white hover:opacity-90'
                              : 'border border-[#2596be] text-[#2596be] hover:bg-[#2596be]/5'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIconClick(item.action);
                          }}
                        >
                          {item.buttonText}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions Card */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-bold text-[#0E1D21]">Quick Actions</h3>
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center gap-1 text-sm text-[#2596be] font-medium hover:text-[#122E34] transition-colors"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r ${action.color}/5 transition-all cursor-pointer group`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#0E1D21] text-center group-hover:text-[#122E34] transition-colors">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support Card */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg border border-[#ABAFB5]/20 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-[#0E1D21] mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-colors"
                  onClick={() => handleIconClick('contact_support')}
                >
                  <MessageSquare className="h-5 w-5 text-[#2596be]" />
                  <div className="text-left">
                    <p className="font-medium text-[#0E1D21]">Chat Support</p>
                    <p className="text-xs text-[#677E8A]">Live chat available 24/7</p>
                  </div>
                </button>
                <button 
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-colors"
                  onClick={() => handleIconClick('call_support')}
                >
                  <Phone className="h-5 w-5 text-[#2596be]" />
                  <div className="text-left">
                    <p className="font-medium text-[#0E1D21]">Call Us</p>
                    <p className="text-xs text-[#677E8A]">555-123-4567</p>
                  </div>
                </button>
                <button 
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#ABAFB5]/20 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-colors"
                  onClick={() => handleIconClick('faq')}
                >
                  <HelpCircle className="h-5 w-5 text-[#2596be]" />
                  <div className="text-left">
                    <p className="font-medium text-[#0E1D21]">FAQ</p>
                    <p className="text-xs text-[#677E8A]">Common questions</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#ABAFB5]/20 shadow-lg z-40">
        <div className="grid grid-cols-4 py-3">
          <button
            onClick={() => handleTabClick('profile')}
            className="flex flex-col items-center justify-center text-xs"
          >
            <User className={`h-5 w-5 mb-1 ${activeTab === 'profile' ? 'text-[#2596be]' : 'text-[#677E8A]'}`} />
            <span className={activeTab === 'profile' ? 'text-[#2596be] font-medium' : 'text-[#677E8A]'}>Profile</span>
          </button>
          <button
            onClick={() => handleTabClick('orders')}
            className="flex flex-col items-center justify-center text-xs"
          >
            <Package className={`h-5 w-5 mb-1 ${activeTab === 'orders' ? 'text-[#2596be]' : 'text-[#677E8A]'}`} />
            <span className={activeTab === 'orders' ? 'text-[#2596be] font-medium' : 'text-[#677E8A]'}>Orders</span>
          </button>
          <button
            onClick={() => handleTabClick('health')}
            className="flex flex-col items-center justify-center text-xs"
          >
            <Heart className={`h-5 w-5 mb-1 ${activeTab === 'health' ? 'text-[#2596be]' : 'text-[#677E8A]'}`} />
            <span className={activeTab === 'health' ? 'text-[#2596be] font-medium' : 'text-[#677E8A]'}>Health</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center text-xs"
          >
            <Settings className="h-5 w-5 mb-1 text-[#677E8A]" />
            <span className="text-[#677E8A]">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}