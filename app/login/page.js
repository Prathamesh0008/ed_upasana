'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simple validation
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data - In real app, validate credentials with backend
      const mockUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        lastName: 'User',
        email: email,
        phone: '+15551234567',
        address: '123 Health Street\nMedical City, MC 12345',
        dateOfBirth: '1990-01-01',
        avatar: null,
        membershipLevel: 'Premium',
        memberSince: new Date().toISOString().split('T')[0],
        lastLogin: 'Just now',
        healthData: {
          bloodType: 'O+',
          allergies: ['None'],
          conditions: [],
          primaryDoctor: 'Dr. Sarah Chen'
        },
        stats: {
          totalOrders: 5,
          activePrescriptions: 2,
          consultations: 3,
          loyaltyPoints: 500
        },
        subscription: {
          plan: 'Annual Premium',
          status: 'active',
          renewalDate: '2024-12-31',
          autoRenew: true
        }
      };

      // Login the user
      login(mockUser);

    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xl">EP</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0E1D21]">Ed</span>
              <span className="text-2xl font-bold text-[#2596be]">Pharma</span>
            </div>
          </Link>
          <p className="mt-2 text-[#677E8A]">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#ABAFB5]/20 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#0E1D21]">Welcome Back</h1>
              <p className="mt-1 text-[#677E8A]">Sign in to continue to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0E1D21]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#ABAFB5] bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0E1D21]">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#ABAFB5] bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20"
                    placeholder="••••••••"
                    required
                  />
                </div>
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ABAFB5]/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-[#677E8A]">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2596be] px-5 py-3 text-[#2596be] font-semibold hover:bg-[#2596be]/5 transition-colors w-full justify-center"
              >
                Create New Account
              </Link>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 border-t border-[#ABAFB5]/20 p-6 text-center">
            <p className="text-[#677E8A]">
              <Link href="/" className="text-[#2596be] hover:underline font-medium">
                ← Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}