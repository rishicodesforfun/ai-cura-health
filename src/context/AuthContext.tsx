import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Mock user interface for development
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions for development
  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      uid: 'mock-user-id',
      email,
      displayName: email.split('@')[0],
      photoURL: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('aicura-user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (email: string, password: string, name?: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      uid: 'mock-user-id',
      email,
      displayName: name || email.split('@')[0],
      photoURL: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('aicura-user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      uid: 'google-user-id',
      email: 'user@gmail.com',
      displayName: 'Google User',
      photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    };
    
    setUser(mockUser);
    localStorage.setItem('aicura-user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('aicura-user');
  };

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('aicura-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};