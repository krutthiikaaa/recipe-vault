import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import '../styles/Profile.css';

function formatUserName(email) {
  if (!email) return 'Guest';
  const name = email.split('@')[0];
  return name
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Profile() {
  const { user } = useAuth();
  const { recipes, favoriteIds, toggleFavorite, isFavorite } = useRecipes();
  const navigate = useNavigate();

  const favorites = useMemo(
    () => recipes.filter((recipe) => favoriteIds.includes(recipe.id)),
    [recipes, favoriteIds]
  );

  const createdRecipes = useMemo(
    () => recipes.filter((recipe) => recipe.isUserCreated),
    [recipes]
  );

  const recentFavorites = favorites.slice(0, 4);
  const recentCreated = createdRecipes.slice(0, 4);
  const username = formatUserName(user?.email);

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero__banner">
          <div className="profile-hero__avatar" aria-hidden="true">
            {username.charAt(0)}
          </div>

          <div className="profile-hero__info">
            <p className="profile-hero__eyebrow">Member profile</p>
            <h1 className="profile-hero__title">Hello, {username}</h1>
            <p className="profile-hero__subtitle">
              Keep your favorite recipes close, manage your own creations, and
              explore new ideas from the Recipe Vault.
            </p>
            <div className="profile-hero__actions">
              <Link to="/explore" className="profile-hero__btn">
                Explore Recipes
                <ArrowRight />
              </Link>
              <Link to="/add-recipe" className="profile-hero__btn profile-hero__btn--ghost">
                Add Recipe
              </Link>
            </div>
          </div>

          <div className="profile-hero__details">
            <div className="profile-hero__detail">
              <span className="profile-hero__detail-label">Email</span>
              <span className="profile-hero__detail-value">{user?.email ?? 'Not set'}</span>
            </div>
            <div className="profile-hero__detail">
              <span className="profile-hero__detail-label">Member since</span>
              <span className="profile-hero__detail-value">Today</span>
            </div>
            <div className="profile-hero__detail">
              <span className="profile-hero__detail-label">Current status</span>
              <span className="profile-hero__detail-value">Active</span>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-stats">
        <div className="profile-stats__grid">
          <div className="profile-stat">
            <span className="profile-stat__icon">
              <Sparkles />
            </span>
            <div>
              <p className="profile-stat__label">Total recipes</p>
              <p className="profile-stat__value">{recipes.length}</p>
            </div>
          </div>
          <div className="profile-stat">
            <span className="profile-stat__icon">
              <Heart />
            </span>
            <div>
              <p className="profile-stat__label">Saved favorites</p>
              <p className="profile-stat__value">{favoriteIds.length}</p>
            </div>
          </div>
          <div className="profile-stat">
            <span className="profile-stat__icon">
              <PlusCircle />
            </span>
            <div>
              <p className="profile-stat__label">Your creations</p>
              <p className="profile-stat__value">{createdRecipes.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-section__header">
          <div>
            <h2>Saved Favorites</h2>
            <p>Recipes you have starred for easy access.</p>
          </div>
          <button
            type="button"
            className="profile-section__link"
            onClick={() => navigate('/favorites')}
          >
            View all
            <ArrowRight />
          </button>
        </div>

        <div className="profile-cards">
          {recentFavorites.length > 0 ? (
            recentFavorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                category={recipe.category}
                cookingTime={recipe.cookTime}
                difficulty={recipe.difficulty ? Number(recipe.difficulty) : undefined}
                isFavorite={isFavorite(recipe.id)}
                onFavoriteToggle={() => toggleFavorite(recipe.id)}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))
          ) : (
            <div className="profile-empty">
              <div>
                <strong>No favorites yet.</strong>
                <p>Add tasty recipes to your favorites so they show up here.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-section__header">
          <div>
            <h2>My Creations</h2>
            <p>Recipes you added to your personal collection.</p>
          </div>
          <button
            type="button"
            className="profile-section__link"
            onClick={() => navigate('/add-recipe')}
          >
            Add new
            <ArrowRight />
          </button>
        </div>

        <div className="profile-cards">
          {recentCreated.length > 0 ? (
            recentCreated.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                category={recipe.category}
                cookingTime={recipe.cookTime}
                difficulty={recipe.difficulty ? Number(recipe.difficulty) : undefined}
                isFavorite={isFavorite(recipe.id)}
                isUserCreated
                onFavoriteToggle={() => toggleFavorite(recipe.id)}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))
          ) : (
            <div className="profile-empty">
              <div>
                <strong>You haven't added any recipes yet.</strong>
                <p>Start building your collection with your own special dishes.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
