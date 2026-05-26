import { useState, useCallback } from 'react';
import { Heart, Clock, ChefHat, Flame, Trash2 } from 'lucide-react';
import './RecipeCard.css';

/**
 * RecipeCard — Reusable recipe card component.
 *
 * @param {Object}   props
 * @param {string}   props.image        - URL of the recipe image
 * @param {string}   props.title        - Recipe title
 * @param {string}   props.category     - Category label (e.g. "Dessert", "Main Course")
 * @param {string}   props.cookingTime  - Cooking time (e.g. "30 min")
 * @param {boolean}  [props.isFavorite] - Controlled favorite state (default: false)
 * @param {number}   [props.difficulty] - Difficulty 1–3 (optional)
 * @param {boolean}  [props.isUserCreated] - Whether the recipe was user-created (shows delete btn)
 * @param {Function} [props.onFavoriteToggle] - Callback when heart is toggled
 * @param {Function} [props.onDelete]   - Callback when delete button is clicked
 * @param {Function} [props.onClick]    - Callback when the card body is clicked
 */
export default function RecipeCard({
  image,
  title,
  category,
  cookingTime,
  isFavorite = false,
  difficulty,
  isUserCreated = false,
  onFavoriteToggle,
  onDelete,
  onClick,
}) {
  const [pop, setPop] = useState(false);

  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation(); // prevent card click
      onFavoriteToggle?.();

      // Trigger pop animation
      setPop(true);
      const timer = setTimeout(() => setPop(false), 450);
      return () => clearTimeout(timer);
    },
    [onFavoriteToggle]
  );

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation(); // prevent card click
      onDelete?.();
    },
    [onDelete]
  );

  const handleCardClick = () => {
    onClick?.();
  };

  // Build difficulty dots (1–3)
  const renderDifficulty = () => {
    if (!difficulty || difficulty < 1 || difficulty > 3) return null;
    return (
      <>
        <span className="recipe-card__meta-dot" />
        <span className="recipe-card__meta-item">
          <Flame className="recipe-card__meta-icon" />
          <span className="recipe-card__difficulty">
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={`recipe-card__difficulty-dot${
                  level <= difficulty ? ' filled' : ''
                }`}
              />
            ))}
          </span>
        </span>
      </>
    );
  };

  return (
    <article className="recipe-card" onClick={handleCardClick}>
      {/* ---- Image ---- */}
      <div className="recipe-card__image-wrapper">
        {image ? (
          <img
            className="recipe-card__image"
            src={image}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="recipe-card__image--placeholder">
            <ChefHat />
          </div>
        )}
        <div className="recipe-card__image-overlay" aria-hidden="true" />

        {/* Category badge */}
        {category && (
          <span className="recipe-card__category">{category}</span>
        )}

        {/* Favorite heart */}
        <button
          className={`recipe-card__favorite${isFavorite ? ' active' : ''}${
            pop ? ' pop' : ''
          }`}
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          type="button"
        >
          <Heart fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Delete button — only for user-created recipes */}
        {isUserCreated && onDelete && (
          <button
            className="recipe-card__delete"
            onClick={handleDelete}
            aria-label={`Delete ${title}`}
            type="button"
          >
            <Trash2 />
          </button>
        )}
      </div>

      {/* ---- Body ---- */}
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{title}</h3>

        <div className="recipe-card__meta">
          {cookingTime && (
            <span className="recipe-card__meta-item">
              <Clock className="recipe-card__meta-icon" />
              {cookingTime}
            </span>
          )}
          {renderDifficulty()}
        </div>
      </div>
    </article>
  );
}
