import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, SearchX, UtensilsCrossed } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
import '../styles/Explore.css';

/* ---- Category config ---- */
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

/* ---- Sort options ---- */
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'time-asc', label: 'Cook Time (Low–High)' },
  { value: 'time-desc', label: 'Cook Time (High–Low)' },
];

/**
 * Parse a cookTime string like "45 mins" or "1 hour" into minutes.
 */
function parseCookTime(str) {
  if (!str) return 0;
  const lower = str.toLowerCase();
  if (lower.includes('hour')) {
    const n = parseInt(lower) || 1;
    return n * 60;
  }
  return parseInt(lower) || 0;
}

export default function Explore() {
  const { recipes, toggleFavorite, isFavorite, deleteRecipe } = useRecipes();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /* Read initial query from URL ?q= */
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  /* Sync search input when URL query param changes */
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q) setSearchQuery(q);
  }, [searchParams]);

  /* ---- Filter & sort recipes ---- */
  const filteredRecipes = useMemo(() => {
    let results = [...recipes];

    // Category filter
    if (activeCategory !== 'All') {
      results = results.filter((r) => r.category === activeCategory);
    }

    // Search filter (title, category, ingredients, shortDescription)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      results = results.filter((r) => {
        const haystack = [
          r.title,
          r.category,
          r.shortDescription,
          ...(r.ingredients || []),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'time-asc':
        results.sort((a, b) => parseCookTime(a.cookTime) - parseCookTime(b.cookTime));
        break;
      case 'time-desc':
        results.sort((a, b) => parseCookTime(b.cookTime) - parseCookTime(a.cookTime));
        break;
      default:
        break;
    }

    return results;
  }, [activeCategory, searchQuery, sortBy, recipes]);

  const clearSearch = () => setSearchQuery('');

  const resetAll = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSortBy('default');
  };

  return (
    <div className="explore">
      {/* ======== Header ======== */}
      <header className="explore__header">
        <span className="explore__badge">
          <UtensilsCrossed className="explore__badge-icon" />
          Explore Collection
        </span>
        <h1 className="explore__title">
          Discover <span className="explore__title-accent">All Recipes</span>
        </h1>
        <p className="explore__description">
          Browse our full collection of hand-picked recipes. Search by name,
          filter by cuisine, or sort to find exactly what you're craving.
        </p>
      </header>

      {/* ======== Search & Filters ======== */}
      <div className="explore__controls">
        {/* Search bar */}
        <div className="explore__search-row">
          <div className="explore__search-wrapper">
            <Search className="explore__search-icon" />
            <input
              className="explore__search-input"
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="explore__search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
                type="button"
              >
                <X />
              </button>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div className="explore__filters">
          {CATEGORIES.map(({ label, emoji }) => (
            <button
              key={label}
              className={`explore__filter-chip${
                activeCategory === label ? ' active' : ''
              }`}
              onClick={() => setActiveCategory(label)}
              type="button"
            >
              <span className="explore__filter-emoji">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ======== Results Info ======== */}
      <div className="explore__results-bar">
        <span className="explore__results-count">
          Showing <strong>{filteredRecipes.length}</strong>{' '}
          {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
          {activeCategory !== 'All' && (
            <> in <strong>{activeCategory}</strong></>
          )}
          {searchQuery.trim() && (
            <> for "<strong>{searchQuery.trim()}</strong>"</>
          )}
        </span>

        <select
          className="explore__sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* ======== Recipe Grid / Empty State ======== */}
      {filteredRecipes.length > 0 ? (
        <div className="explore__grid" key={`${activeCategory}-${searchQuery}-${sortBy}`}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              title={recipe.title}
              category={recipe.category}
              cookingTime={recipe.cookTime}
              difficulty={DIFFICULTY_MAP[recipe.difficulty] || 0}
              isFavorite={isFavorite(recipe.id)}
              isUserCreated={recipe.isUserCreated}
              onFavoriteToggle={() => toggleFavorite(recipe.id)}
              onDelete={recipe.isUserCreated ? () => deleteRecipe(recipe.id) : undefined}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="explore__empty">
          <SearchX className="explore__empty-icon" />
          <h3 className="explore__empty-title">No recipes found</h3>
          <p className="explore__empty-text">
            We couldn't find any recipes matching your search. Try adjusting your
            filters or search term.
          </p>
          <button
            className="explore__empty-btn"
            onClick={resetAll}
            type="button"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
