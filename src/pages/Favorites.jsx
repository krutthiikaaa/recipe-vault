import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, HeartOff, ArrowRight } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
import '../styles/Favorites.css';

/* ---- Map difficulty strings → numbers ---- */
const DIFFICULTY_MAP = { Easy: 1, Medium: 2, Hard: 3 };

export default function Favorites() {
  const { recipes, favoriteIds, toggleFavorite, deleteRecipe } = useRecipes();
  const navigate = useNavigate();

  const favoriteRecipes = useMemo(
    () => recipes.filter((r) => favoriteIds.includes(r.id)),
    [recipes, favoriteIds]
  );

  return (
    <div className="favorites">
      {/* ======== Header ======== */}
      <header className="favorites__header">
        <span className="favorites__badge">
          <Heart className="favorites__badge-icon" />
          Your Collection
        </span>
        <h1 className="favorites__title">
          Saved <span className="favorites__title-accent">Favorites</span>
        </h1>
        <p className="favorites__description">
          All your favorite recipes in one place. Tap the heart on any recipe
          across the app to save it here.
        </p>
      </header>

      {/* ======== Grid or Empty ======== */}
      {favoriteRecipes.length > 0 ? (
        <div className="favorites__grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              title={recipe.title}
              category={recipe.category}
              cookingTime={recipe.cookTime}
              difficulty={DIFFICULTY_MAP[recipe.difficulty] || 0}
              isFavorite={true}
              isUserCreated={recipe.isUserCreated}
              onFavoriteToggle={() => toggleFavorite(recipe.id)}
              onDelete={recipe.isUserCreated ? () => deleteRecipe(recipe.id) : undefined}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="favorites__empty">
          <HeartOff className="favorites__empty-icon" />
          <h3 className="favorites__empty-title">No favorites yet</h3>
          <p className="favorites__empty-text">
            Browse recipes and tap the heart icon to save your favorites here
            for quick access.
          </p>
          <Link to="/explore" className="favorites__empty-btn">
            Explore Recipes
            <ArrowRight className="favorites__empty-btn-icon" />
          </Link>
        </div>
      )}
    </div>
  );
}
