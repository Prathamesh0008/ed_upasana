'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    // Generate a simple token
    const token = Math.random().toString(36).substring(2);
    
    // Save to localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Update state
    setUser(userData);
    
    // Redirect to account page
    router.push('/account');
  };

  const register = (userData) => {
    // Generate a simple token
    const token = Math.random().toString(36).substring(2);
    
    // Create user object with additional fields
    const newUser = {
      id: Math.random().toString(36).substring(2),
      ...userData,
      memberSince: new Date().toISOString().split('T')[0],
      membershipLevel: 'Basic',
      lastLogin: 'Just now',
      stats: {
        totalOrders: 0,
        activePrescriptions: 0,
        consultations: 0,
        loyaltyPoints: 100, // Welcome bonus
      },
      subscription: {
        plan: 'Free',
        status: 'active',
        renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        autoRenew: false
      }
    };
    
    // Save to localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Update state
    setUser(newUser);
    
    // Redirect to account page
    router.push('/account');
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    // Update state
    setUser(null);
    
    // Redirect to login page
    router.push('/auth');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}