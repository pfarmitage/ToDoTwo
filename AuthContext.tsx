import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextData {
  user: firebase.default.User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.default.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
