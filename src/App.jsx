import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<ComingSoon title="Recipe Details" />} />
        <Route path="*" element={<ComingSoon title="Page Not Found" />} />
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