
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  syncUserData: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const syncUserData = () => {
    if (!user) return;
    
    // Sync user progress to server/localStorage with user ID
    const userKey = `user_${user.id}`;
    const currentPoints = localStorage.getItem('userPoints') || '0';
    const currentLevels = localStorage.getItem('completedLevels') || '[]';
    const examData = {
      score: localStorage.getItem('examScore'),
      completed: localStorage.getItem('examCompleted'),
      hasBadge: localStorage.getItem('hasLinuxDragonBadge'),
      badgeHolderName: localStorage.getItem('badgeHolderName')
    };

    const userData = {
      points: currentPoints,
      completedLevels: currentLevels,
      examData
    };

    localStorage.setItem(userKey, JSON.stringify(userData));
  };

  const loadUserData = (userData: User) => {
    const userKey = `user_${userData.id}`;
    const savedData = localStorage.getItem(userKey);
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      localStorage.setItem('userPoints', parsedData.points);
      localStorage.setItem('completedLevels', parsedData.completedLevels);
      
      if (parsedData.examData.score) {
        localStorage.setItem('examScore', parsedData.examData.score);
      }
      if (parsedData.examData.completed) {
        localStorage.setItem('examCompleted', parsedData.examData.completed);
      }
      if (parsedData.examData.hasBadge) {
        localStorage.setItem('hasLinuxDragonBadge', parsedData.examData.hasBadge);
      }
      if (parsedData.examData.badgeHolderName) {
        localStorage.setItem('badgeHolderName', parsedData.examData.badgeHolderName);
      }
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    loadUserData(userData);
  };

  const logout = () => {
    if (user) {
      syncUserData();
    }
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    // Clear current session data
    localStorage.removeItem('userPoints');
    localStorage.removeItem('completedLevels');
    localStorage.removeItem('examScore');
    localStorage.removeItem('examCompleted');
    localStorage.removeItem('hasLinuxDragonBadge');
    localStorage.removeItem('badgeHolderName');
  };

  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    const handleClientSideInit = () => {
      const savedUser = localStorage.getItem('currentUser');
      const loggedIn = localStorage.getItem('isLoggedIn');
      
      if (savedUser && loggedIn === 'true') {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
        loadUserData(userData);
      }
      setIsLoaded(true);
    };

    // Ensure this runs only on client side
    if (typeof window !== 'undefined') {
      handleClientSideInit();
    }
  }, []);

  // Auto-sync user data periodically
  useEffect(() => {
    if (isLoggedIn && user && typeof window !== 'undefined') {
      const interval = setInterval(syncUserData, 30000); // Sync every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-loader-4-line text-white text-2xl animate-spin"></i>
          </div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, syncUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
