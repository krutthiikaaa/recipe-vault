import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add-recipe" element={<PlaceholderPage title="Add Recipe" />} />
        <Route path="/favorites" element={<PlaceholderPage title="Favorites" />} />
        <Route path="/recipe/:id" element={<PlaceholderPage title="Recipe Details" />} />
      </Routes>
    </div>
  );
}

/* Temporary placeholder for pages not yet built */
function PlaceholderPage({ title }) {
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