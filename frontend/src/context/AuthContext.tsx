import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  village: string;
  district: string;
  state: string;
  landArea: number;
  cropType: string;
  avatar: string;
}

interface RegisterData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  village: string;
  district: string;
  state: string;
  landArea: number;
  cropType: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for offline/mock mode
const DEMO_USERS: Record<string, { user: User; password: string }> = {
  'rajesh@example.com': {
    password: 'demo1234',
    user: {
      id: 'demo-001', name: 'Rajesh Kumar', email: 'rajesh@example.com',
      mobile: '9876543210', village: 'Baramati', district: 'Pune',
      state: 'Maharashtra', landArea: 12.5, cropType: 'Wheat', avatar: 'RK'
    }
  },
  '9876543210': {
    password: 'demo1234',
    user: {
      id: 'demo-001', name: 'Rajesh Kumar', email: 'rajesh@example.com',
      mobile: '9876543210', village: 'Baramati', district: 'Pune',
      state: 'Maharashtra', landArea: 12.5, cropType: 'Wheat', avatar: 'RK'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('agriverse_token');
      const storedUser = localStorage.getItem('agriverse_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      localStorage.removeItem('agriverse_token');
      localStorage.removeItem('agriverse_user');
    }
    setIsLoading(false);
  }, []);

  const saveSession = (tok: string, usr: User) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem('agriverse_token', tok);
    localStorage.setItem('agriverse_user', JSON.stringify(usr));
  };

  const login = async (identifier: string, password: string): Promise<void> => {
    // Try real backend first
    try {
      const response = await axios.post('/api/auth/login', { identifier, password }, { timeout: 3000 });
      const { token: tok, user: usr } = response.data;
      saveSession(tok, { ...usr, avatar: usr.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() });
      return;
    } catch (backendError: any) {
      // If backend is down, use mock
      if (!backendError.response) {
        // Network error - use mock
        const demo = DEMO_USERS[identifier.toLowerCase()] || DEMO_USERS[identifier];
        if (demo && demo.password === password) {
          saveSession('mock-jwt-' + Date.now(), demo.user);
          return;
        }
        throw new Error('Invalid email/mobile or password');
      }
      // Backend returned an error
      throw new Error(backendError.response?.data?.error || 'Login failed');
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    // Try real backend first
    try {
      const response = await axios.post('/api/auth/register', data, { timeout: 3000 });
      const { token: tok, user: usr } = response.data;
      const avatar = data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      saveSession(tok, { ...usr, avatar });
      return;
    } catch (backendError: any) {
      if (!backendError.response) {
        // Network error - mock register
        const avatar = data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const newUser: User = {
          id: 'user-' + Date.now(),
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          village: data.village || '',
          district: data.district || '',
          state: data.state || '',
          landArea: data.landArea || 0,
          cropType: data.cropType || 'Wheat',
          avatar,
        };
        saveSession('mock-jwt-' + Date.now(), newUser);
        return;
      }
      throw new Error(backendError.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('agriverse_token');
    localStorage.removeItem('agriverse_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
