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

const login = useCallback(async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    const authData = {
      email: data.user.email,
    };

    saveJSON(AUTH_KEY, authData);
    setUser(authData);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}, []);

const signup = useCallback(async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    const authData = {
      email: data.user.email,
    };

    saveJSON(AUTH_KEY, authData);
    setUser(authData);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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
