import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';

import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
import RecipeDetails from './pages/RecipeDetails';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-recipe"
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/recipe/:id"
  element={
    <ProtectedRoute>
      <RecipeDetails />
    </ProtectedRoute>
  }
/>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? '/' : '/login'} replace />
          }
        />
       
      </Routes>
    </div>
  );
}

/* Minimal placeholder for the one remaining unbuilt page */
function ComingSoon({ title }) {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: '80px auto',
        textAlign: 'center',
        padding: '0 28px',
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
          color: '#faf5ef',
          marginBottom: 12,
        }}
      >
        {title}
      </h1>
      <p style={{ color: 'rgba(250,245,239,0.45)', fontFamily: "'Inter', sans-serif" }}>
        This page is coming soon.
      </p>
    </div>
  );
}

export default App;