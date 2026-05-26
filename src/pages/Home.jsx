import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ChefHat,
  Sparkles,
  UtensilsCrossed,
  BookOpen,
  Users,
} from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
import '../styles/Home.css';

/* ---- Category config with emojis ---- */
const CATEGORIES = [
  { label: 'All', emoji: '🍽️' },
  { label: 'Indian', emoji: '🍛' },
  { label: 'Arabian', emoji: '🧆' },
  { label: 'Italian', emoji: '🍕' },
  { label: 'Japanese', emoji: '🍣' },
  { label: 'Mexican', emoji: '🌮' },
  { label: 'American', emoji: '🍔' },
  { label: 'Dessert', emoji: '🍰' },
];

/* ---- Map difficulty strings → numbers ---- */
const DIFFICULTY_MAP = { Easy: 1, Medium: 2, Hard: 3 };

export default function Home() {
  const { recipes, toggleFavorite, isFavorite } = useRecipes();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  /* ---- Stats (derived from live recipe count) ---- */
  const STATS = useMemo(() => [
    { number: `${recipes.length}+`, label: 'Recipes', icon: BookOpen },
    { number: `${CATEGORIES.length - 1}`, label: 'Cuisines', icon: UtensilsCrossed },
    { number: '15k+', label: 'Happy Cooks', icon: Users },
    { number: '4.9', label: 'Avg Rating', icon: Sparkles },
  ], [recipes.length]);

  /* ---- Filter, then take first 6 ---- */
  const featuredRecipes = useMemo(() => {
    let filtered = recipes;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((r) => r.category === activeCategory);
    }

    return filtered.slice(0, 6);
  }, [activeCategory, recipes]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="home">
      {/* ======== Hero Section ======== */}
      <section className="hero">
        <div className="hero__bg">
          <img
            className="hero__bg-image"
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80"
            alt="Cooking background"
          />
          <div className="hero__bg-overlay" />
        </div>

        <div className="hero__content">
          <span className="hero__badge">
            <ChefHat className="hero__badge-icon" />
            Discover Delicious Recipes
          </span>

          <h1 className="hero__title">
            Your Personal{' '}
            <span className="hero__title-accent">Recipe Vault</span>
          </h1>

          <p className="hero__description">
            Explore a handpicked collection of mouth-watering recipes from around
            the world. From quick bites to gourmet meals — find your next
            culinary adventure.
          </p>

          <div className="hero__actions">
            <Link to="/explore" className="hero__cta">
              Explore Recipes
              <ArrowRight className="hero__cta-icon" />
            </Link>
            <Link to="/add-recipe" className="hero__cta hero__cta--outline">
              Share a Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* ======== Search Bar ======== */}
      <div className="home-search">
        <form className="home-search__wrapper" onSubmit={handleSearch}>
          <Search className="home-search__icon" />
          <input
            className="home-search__input"
            type="text"
            placeholder="Search recipes, ingredients, cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="home-search__btn" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* ======== Category Section ======== */}
      <section className="home-section">
        <div className="home-section__header">
          <div>
            <h2 className="home-section__title">Browse by Category</h2>
            <p className="home-section__subtitle">
              Explore cuisines from around the globe
            </p>
          </div>
        </div>

        <div className="categories__grid">
          {CATEGORIES.map(({ label, emoji }) => (
            <button
              key={label}
              className={`category-chip${
                activeCategory === label ? ' active' : ''
              }`}
              onClick={() => setActiveCategory(label)}
              type="button"
            >
              <span className="category-chip__emoji">{emoji}</span>
              <span className="category-chip__label">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ======== Featured Recipes ======== */}
      <section className="home-section">
        <div className="home-section__header">
          <div>
            <h2 className="home-section__title">
              {activeCategory === 'All'
                ? 'Featured Recipes'
                : `${activeCategory} Recipes`}
            </h2>
            <p className="home-section__subtitle">
              Hand-picked favorites to inspire your next meal
            </p>
          </div>
          <Link to="/explore" className="home-section__link">
            View all
            <ArrowRight className="home-section__link-icon" />
          </Link>
        </div>

        <div className="recipes__grid">
          {featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                category={recipe.category}
                cookingTime={recipe.cookTime}
                difficulty={DIFFICULTY_MAP[recipe.difficulty] || 0}
                isFavorite={isFavorite(recipe.id)}
                onFavoriteToggle={() => toggleFavorite(recipe.id)}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))
          ) : (
            <p
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                color: 'rgba(250,245,239,0.35)',
                fontFamily: "'Inter', sans-serif",
                padding: '60px 0',
              }}
            >
              No recipes found in this category.
            </p>
          )}
        </div>
      </section>

      {/* ======== Stats Strip ======== */}
      <div className="home-stats">
        <div className="home-stats__grid">
          {STATS.map(({ number, label }) => (
            <div key={label} className="home-stat">
              <span className="home-stat__number">{number}</span>
              <span className="home-stat__label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ======== View All Button ======== */}
      <div className="home-view-all">
        <Link to="/explore" className="home-view-all__btn">
          View All Recipes
          <ArrowRight className="home-view-all__btn-icon" />
        </Link>
      </div>
    </div>
  );
}
