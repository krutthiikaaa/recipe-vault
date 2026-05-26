import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'recipeVaultAuth';
const USER_KEY = 'recipeVaultUser';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(AUTH_KEY, null));

  const login = useCallback(({ email, password }) => {
    const stored = loadJSON(USER_KEY, null);
    if (!stored || stored.email !== email || stored.password !== password) {
      return false;
    }
    const authData = { email };
    saveJSON(AUTH_KEY, authData);
    setUser(authData);
    return true;
  }, []);

  const signup = useCallback(({ email, password }) => {
    const stored = loadJSON(USER_KEY, null);
    if (stored && stored.email === email) {
      return false;
    }
    const userData = { email, password };
    saveJSON(USER_KEY, userData);
    const authData = { email };
    saveJSON(AUTH_KEY, authData);
    setUser(authData);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
