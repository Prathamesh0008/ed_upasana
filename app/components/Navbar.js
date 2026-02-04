'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, Mail, MapPin, ShoppingCart, 
  User, Search, Menu, X, Home, 
  Package, Users, FileText, MessageSquare 
} from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
  { name: 'Products', href: '/products', icon: <Package className="w-4 h-4" /> },
  { name: 'Services', href: '/services', icon: <FileText className="w-4 h-4" /> },
  { name: 'About', href: '/about', icon: <Users className="w-4 h-4" /> },
  { name: '', href: '/ConsultationServices', icon: <Users className="w-4 h-4" /> },
  { name: 'Contact', href: '/contact', icon: <MessageSquare className="w-4 h-4" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Info Bar - Matches contact page hero */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-xs sm:text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                <span>support@edpharma.com</span>
              </div>
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
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shadow-md">
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
              <div className="hidden md:flex items-center relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="search"
                  placeholder="Search medicines..."
                  className="pl-10 pr-4 py-2 w-48 rounded-xl border border-[#ABAFB5] bg-white text-sm text-[#0E1D21] placeholder:text-[#677E8A] focus:outline-none focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20"
                />
              </div>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-[#2596be]/5 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-[#0E1D21]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-xs rounded-full flex items-center justify-center border border-white">
                  3
                </span>
              </Link>

              {/* User Icon */}
              <Link
                href="/account"
                className="p-2 hover:bg-[#2596be]/5 rounded-lg transition-colors"
              >
                <User className="h-5 w-5 text-[#0E1D21]" />
              </Link>

              

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-[#2596be]/5 rounded-lg transition-colors"
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
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="search"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ABAFB5] bg-white text-sm text-[#0E1D21] placeholder:text-[#677E8A] focus:outline-none focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20"
                />
              </div>

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

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-[#ABAFB5]/20">
                <Link
                  href="/ConsultationServices"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] text-white font-semibold hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition-all"
                >
                  <Phone className="h-5 w-5" />
                  <span>ConsultationServices</span>
                </Link>
              </div>

              {/* Additional Mobile Links */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <Link
                  href="/track-order"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-center text-sm text-[#0E1D21] bg-[#2596be]/5 rounded-lg hover:bg-[#2596be]/10 transition-colors"
                >
                  Track Order
                </Link>
                <Link
                  href="/find-pharmacy"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-center text-sm text-[#0E1D21] bg-[#2596be]/5 rounded-lg hover:bg-[#2596be]/10 transition-colors"
                >
                  Find Pharmacy
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
    </header>
  );
}