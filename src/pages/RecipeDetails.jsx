import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Flame,
  Users,
  Zap,
  ChefHat,
  Heart,
  Lightbulb,
  UtensilsCrossed,
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import '../styles/RecipeDetails.css';

/* ---- Difficulty label mapping ---- */
const DIFFICULTY_CONFIG = {
  Easy: { level: 1, color: '#4ade80' },
  Medium: { level: 2, color: '#f5a563' },
  Hard: { level: 3, color: '#ef4444' },
};

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleFavorite, isFavorite } = useRecipes();

  /* Find the matching recipe by id (handle both number & string ids) */
  const recipe = useMemo(() => {
    const numericId = Number(id);
    return recipes.find(
      (r) => r.id === numericId || r.id === id
    );
  }, [id, recipes]);

  /* ---- 404 state ---- */
  if (!recipe) {
    return (
      <div className="rd-not-found">
        <UtensilsCrossed className="rd-not-found__icon" />
        <h1 className="rd-not-found__title">Recipe Not Found</h1>
        <p className="rd-not-found__text">
          We couldn't find the recipe you're looking for. It may have been
          removed or the link is incorrect.
        </p>
        <button
          className="rd-not-found__btn"
          onClick={() => navigate('/explore')}
          type="button"
        >
          <ArrowLeft className="rd-not-found__btn-icon" />
          Back to Explore
        </button>
      </div>
    );
  }

  const favorited = isFavorite(recipe.id);
  const diffConfig = DIFFICULTY_CONFIG[recipe.difficulty] || DIFFICULTY_CONFIG.Easy;

  return (
    <div className="rd">
      {/* ======== Hero Image Section ======== */}
      <section className="rd__hero">
        <div className="rd__hero-img-wrapper">
          {recipe.image ? (
            <img
              className="rd__hero-img"
              src={recipe.image}
              alt={recipe.title}
            />
          ) : (
            <div className="rd__hero-placeholder">
              <ChefHat />
            </div>
          )}
          <div className="rd__hero-overlay" />
        </div>

        {/* Floating controls over the hero image */}
        <div className="rd__hero-controls">
          <button
            className="rd__back-btn"
            onClick={() => navigate('/explore')}
            type="button"
            aria-label="Back to Explore"
          >
            <ArrowLeft />
          </button>

          <button
            className={`rd__fav-btn${favorited ? ' active' : ''}`}
            onClick={() => toggleFavorite(recipe.id)}
            type="button"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart fill={favorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title card overlapping the image bottom */}
        <div className="rd__hero-info">
          {recipe.category && (
            <span className="rd__category-badge">{recipe.category}</span>
          )}
          <h1 className="rd__title">{recipe.title}</h1>
          <p className="rd__short-desc">{recipe.shortDescription}</p>

          {/* Quick stats row */}
          <div className="rd__quick-stats">
            {recipe.cookTime && (
              <div className="rd__stat">
                <Clock className="rd__stat-icon" />
                <span>{recipe.cookTime}</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="rd__stat">
                <Flame className="rd__stat-icon" style={{ color: diffConfig.color }} />
                <span>{recipe.difficulty}</span>
                <span className="rd__difficulty-dots">
                  {[1, 2, 3].map((l) => (
                    <span
                      key={l}
                      className={`rd__difficulty-dot${l <= diffConfig.level ? ' filled' : ''}`}
                      style={l <= diffConfig.level ? { background: diffConfig.color } : {}}
                    />
                  ))}
                </span>
              </div>
            )}
            {recipe.servings && (
              <div className="rd__stat">
                <Users className="rd__stat-icon" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
            {recipe.calories && (
              <div className="rd__stat">
                <Zap className="rd__stat-icon" />
                <span>{recipe.calories} kcal</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======== Main Content ======== */}
      <div className="rd__content">
        {/* ---- Nutrition Card ---- */}
        {recipe.nutrition && (
          <section className="rd__section rd__nutrition-section">
            <h2 className="rd__section-title">
              <Zap className="rd__section-icon" />
              Nutrition Per Serving
            </h2>
            <div className="rd__nutrition-grid">
              {[
                { label: 'Protein', value: recipe.nutrition.protein, color: '#4ade80' },
                { label: 'Carbs', value: recipe.nutrition.carbs, color: '#f5a563' },
                { label: 'Fat', value: recipe.nutrition.fat, color: '#f472b6' },
                { label: 'Fiber', value: recipe.nutrition.fiber, color: '#60a5fa' },
              ].map(({ label, value, color }) => (
                <div className="rd__nutrition-card" key={label}>
                  <span className="rd__nutrition-value" style={{ color }}>{value}</span>
                  <span className="rd__nutrition-label">{label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---- Ingredients ---- */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <section className="rd__section">
            <h2 className="rd__section-title">
              <UtensilsCrossed className="rd__section-icon" />
              Ingredients
            </h2>
            <ul className="rd__ingredients-list">
              {recipe.ingredients.map((item, idx) => (
                <li className="rd__ingredient" key={idx}>
                  <span className="rd__ingredient-bullet" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---- Instructions ---- */}
        {recipe.instructions && recipe.instructions.length > 0 && (
          <section className="rd__section">
            <h2 className="rd__section-title">
              <ChefHat className="rd__section-icon" />
              Step-by-Step Instructions
            </h2>
            <ol className="rd__steps-list">
              {recipe.instructions.map((step, idx) => (
                <li className="rd__step" key={idx}>
                  <span className="rd__step-number">{idx + 1}</span>
                  <p className="rd__step-text">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ---- Chef Tip ---- */}
        {recipe.chefTip && (
          <section className="rd__section rd__tip-section">
            <div className="rd__tip-card">
              <div className="rd__tip-header">
                <Lightbulb className="rd__tip-icon" />
                <h3 className="rd__tip-title">Chef's Tip</h3>
              </div>
              <p className="rd__tip-text">{recipe.chefTip}</p>
            </div>
          </section>
        )}

        {/* ---- Back Button ---- */}
        <div className="rd__bottom-action">
          <button
            className="rd__explore-btn"
            onClick={() => navigate('/explore')}
            type="button"
          >
            <ArrowLeft className="rd__explore-btn-icon" />
            Back to Explore
          </button>
        </div>
      </div>
    </div>
  );
}
