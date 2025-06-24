
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'student' | 'company' | 'cdc' | null;

interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  details?: 
    | { branch: string; cgpa: number; year: number; resumeUrl: string } // for 'student'
    | { industry: string; location: string; website: string } // for 'company'
    | { department: string; college: string }; // for 'cdc'
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    username: '19A91A0500',
    password: 'student123',
    name: 'John Student',
    role: 'student' as UserRole,
    details: {
      branch: 'CSE',
      cgpa: 8.5,
      year: 4,
      resumeUrl: '/resume.pdf',
    }
  },
  {
    id: '2',
    username: 'microsoft',
    password: 'company123',
    name: 'Microsoft',
    role: 'company' as UserRole,
    details: {
      industry: 'Technology',
      location: 'Hyderabad',
      website: 'https://microsoft.com',
    }
  },
  {
    id: '3',
    username: 'cdcadmin',
    password: 'cdc123',
    name: 'CDC Admin',
    role: 'cdc' as UserRole,
    details: {
      department: 'Career Development Cell',
      college: 'JNTU College of Engineering',
    }
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulating API call
    try {
      // Find user with matching credentials and role
      const foundUser = MOCK_USERS.find(
        u => u.username === username && u.password === password && u.role === role
      );
      
      if (foundUser) {
        // Create user object without password for storage
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials. Please try again.');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again later.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('You have been logged out.');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Removed useAuth hook. Import it from the hooks folder instead.
