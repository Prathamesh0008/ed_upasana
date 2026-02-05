// app/components/Navbar.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { 
  Phone, Mail, MapPin, ShoppingCart, 
  User, Search, Menu, X, Home, 
  Package, Users, FileText, MessageSquare 
} from 'lucide-react';
import { useCart } from '@/app/context/CartContext';


const navLinks = [
  { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
  { name: 'Products', href: '/products', icon: <Package className="w-4 h-4" /> },
  { name: 'Services', href: '/services', icon: <FileText className="w-4 h-4" /> },
  { name: 'About', href: '/about', icon: <Users className="w-4 h-4" /> },
  { name: 'Consultation', href: '/consultation', icon: <Users className="w-4 h-4" /> },
  { name: 'Contact', href: '/contact', icon: <MessageSquare className="w-4 h-4" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { cartCount, cart, getTotalPrice } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-xs sm:text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center gap-1.5 hover:text-[#2596be] transition-colors">
                <Phone className="h-3 w-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 hover:text-[#2596be] transition-colors">
                <Mail className="h-3 w-3" />
                <span>support@edpharma.com</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/track-order" 
                className="flex items-center gap-1.5 hover:text-[#2596be] transition-colors"
              >
                <Package className="h-3 w-3" />
                <span>Track Order</span>
              </Link>
              <Link 
                href="/find-pharmacy" 
                className="hidden sm:flex items-center gap-1.5 hover:text-[#2596be] transition-colors"
              >
                <MapPin className="h-3 w-3" />
                <span>Find Pharmacy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-[#ABAFB5]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-white font-bold text-lg">EP</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold text-[#0E1D21]">Ed</span>
                  <span className="text-xl font-bold text-[#2596be]">Pharma</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#2596be]'
                      : 'text-[#0E1D21] hover:text-[#2596be] hover:bg-[#2596be]/5'
                  }`}
                >
                  <span className={`${pathname === link.href ? 'text-[#2596be]' : 'text-[#677E8A]'}`}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medicines..."
                  className="pl-10 pr-4 py-2 w-48 rounded-xl border border-[#ABAFB5] bg-white text-sm text-[#0E1D21] placeholder:text-[#677E8A] focus:outline-none focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20"
                />
              </form>

              {/* Cart Icon with Dropdown */}
              <div className="relative group">
                <Link
                  href="/cart"
                  className="relative p-2 hover:bg-[#2596be]/5 rounded-lg transition-colors flex items-center gap-1"
                >
                  <ShoppingCart className="h-5 w-5 text-[#0E1D21]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-xs rounded-full flex items-center justify-center border border-white font-bold">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                  <span className="hidden lg:inline text-sm font-medium text-[#0E1D21] ml-1">
                    Cart
                  </span>
                </Link>

                {/* Cart Dropdown Preview */}
                {cart && cart.length > 0 && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#ABAFB5]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-[#0E1D21]">Shopping Cart</h3>
                        <span className="text-sm text-[#2596be] font-medium">{cartCount} items</span>
                      </div>
                      
                      <div className="max-h-60 overflow-y-auto space-y-3">
                        {cart.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-[#2596be]/5 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#2596be]/20 to-[#122E34]/20 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-[#2596be]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#0E1D21] truncate">{item.name}</p>
                              <p className="text-xs text-[#677E8A]">
                                Qty: {item.quantity} × ${parseFloat(item.price || 0).toFixed(2)}
                              </p>
                            </div>
                            <span className="font-semibold text-[#0E1D21]">
                              ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        
                        {cart.length > 3 && (
                          <p className="text-center text-sm text-[#2596be] py-2">
                            +{cart.length - 3} more items
                          </p>
                        )}
                      </div>
                      
                      <div className="border-t border-[#ABAFB5]/20 pt-3 mt-3">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[#0E1D21] font-medium">Total:</span>
                          <span className="text-lg font-bold text-[#2596be]">${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <Link
                          href="/cart"
                          className="block w-full py-2 text-center rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] text-white font-semibold hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition-all"
                        >
                          View Cart & Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Account */}
              <Link
                href="/account"
                className="p-2 hover:bg-[#2596be]/5 rounded-lg transition-colors flex items-center gap-1"
              >
                <User className="h-5 w-5 text-[#0E1D21]" />
                <span className="hidden lg:inline text-sm font-medium text-[#0E1D21]">Account</span>
              </Link>

              {/* Consultation CTA Button */}
              <Link
                href="/consultation"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] text-white text-sm font-semibold hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition-all shadow-md hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                <span>Free Consultation</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-[#2596be]/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-[#0E1D21]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#0E1D21]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-[#ABAFB5]/20 bg-white">
            <div className="px-4 py-3 space-y-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ABAFB5] bg-white text-sm text-[#0E1D21] placeholder:text-[#677E8A] focus:outline-none focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20"
                />
              </form>

              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#2596be]'
                      : 'text-[#0E1D21] hover:bg-[#2596be]/5'
                  }`}
                >
                  <span className={`${pathname === link.href ? 'text-[#2596be]' : 'text-[#677E8A]'}`}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ))}

              {/* Cart Summary in Mobile Menu */}
              {cartCount > 0 && (
                <div className="p-4 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-[#2596be]" />
                      <span className="font-semibold text-[#0E1D21]">Your Cart</span>
                    </div>
                    <span className="bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <p className="text-sm text-[#677E8A] mb-3">
                    Total: <span className="font-bold text-[#0E1D21]">${getTotalPrice().toFixed(2)}</span>
                  </p>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-2 text-center rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] text-white font-semibold hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition-all"
                  >
                    View Cart
                  </Link>
                </div>
              )}

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-[#ABAFB5]/20">
                <Link
                  href="/consultation"
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] text-white font-semibold hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition-all"
                >
                  <Phone className="h-5 w-5" />
                  <span>Free Consultation</span>
                </Link>
              </div>

              {/* Additional Mobile Links */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <Link
                  href="/track-order"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center px-3 py-3 text-center text-sm text-[#0E1D21] bg-[#2596be]/5 rounded-lg hover:bg-[#2596be]/10 transition-colors"
                >
                  <Package className="h-4 w-4 mb-1" />
                  Track Order
                </Link>
                <Link
                  href="/find-pharmacy"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center px-3 py-3 text-center text-sm text-[#0E1D21] bg-[#2596be]/5 rounded-lg hover:bg-[#2596be]/10 transition-colors"
                >
                  <MapPin className="h-4 w-4 mb-1" />
                  Find Pharmacy
                </Link>
              </div>

              {/* Account Links */}
              <div className="pt-4 border-t border-[#ABAFB5]/20">
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#0E1D21] hover:bg-[#2596be]/5 transition-colors"
                >
                  <User className="h-5 w-5 text-[#2596be]" />
                  <span>My Account</span>
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#0E1D21] hover:bg-[#2596be]/5 transition-colors"
                >
                  <Package className="h-5 w-5 text-[#2596be]" />
                  <span>My Orders</span>
                </Link>
                <Link
                  href="/account/prescriptions"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#0E1D21] hover:bg-[#2596be]/5 transition-colors"
                >
                  <FileText className="h-5 w-5 text-[#2596be]" />
                  <span>My Prescriptions</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}