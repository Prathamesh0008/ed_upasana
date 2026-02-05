'use client';

import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                <span className="text-white font-bold text-xl">EP</span>
              </div>
              <span className="text-2xl font-bold text-white">EdPharma</span>
            </div>
            <p className="text-white/90 mb-6">
              Your trusted partner in healthcare. Quality medicines with fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FiFacebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FiTwitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FiInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FiLinkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-[#2596be] to-[#122E34] rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-[#2596be] to-[#122E34] rounded-full"></div>
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Prescription Medicines
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Medical Devices
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Personal Care
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#2596be] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Health Supplements
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-[#2596be] to-[#122E34] rounded-full"></div>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                  <FiPhone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                  <p className="text-white/80 text-sm">Mon–Fri 9am–6pm EST</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                  <FiMail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">support@edpharma.com</p>
                  <p className="text-white/80 text-sm">General inquiries</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                  <FiMapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">123 Health Street</p>
                  <p className="text-white/80 text-sm">Medical City, MC 12345</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
       
        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/80">
                &copy; {new Date().getFullYear()} EdPharma. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy&policy" className="text-white/80 hover:text-white transition-colors">
                privacy Policy
              </Link>
              <Link href="/Terms&Condition" className="text-white/80 hover:text-white transition-colors">
                Terms of Sevirce
              </Link>
              <Link href="/sitemap" className="text-white/80 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/FAQ" className="text-white/80 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}