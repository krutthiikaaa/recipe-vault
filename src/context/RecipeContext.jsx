import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import defaultRecipes from '../data/recipes';

const RecipeContext = createContext(null);

/* ---- LocalStorage helpers ---- */
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

/* ---- Keys ---- */
const FAVORITES_KEY = 'rv_favorites';
const USER_RECIPES_KEY = 'rv_user_recipes';

/**
 * RecipeProvider
 *
 * Manages two collections:
 *  1. recipes  = defaultRecipes (read-only) + userRecipes (from localStorage)
 *  2. favorites = array of recipe IDs (persisted to localStorage)
 *
 * User-created recipes are tagged with `isUserCreated: true`.
 */
export function RecipeProvider({ children }) {
  /* ---- User-created recipes (persisted) ---- */
  const [userRecipes, setUserRecipes] = useState(() =>
    loadJSON(USER_RECIPES_KEY, [])
  );

  /* ---- Favorite IDs (persisted) ---- */
  const [favoriteIds, setFavoriteIds] = useState(() =>
    loadJSON(FAVORITES_KEY, [])
  );

  /* ---- Combined recipe list ---- */
  const recipes = useMemo(() => {
    // Tag default recipes so we know they can't be deleted
    const tagged = defaultRecipes.map((r) => ({
      ...r,
      isUserCreated: false,
    }));
    return [...tagged, ...userRecipes];
  }, [userRecipes]);

  /* ---- Add a new recipe ---- */
  const addRecipe = useCallback((recipeData) => {
    const newRecipe = {
      ...recipeData,
      id: Date.now(),
      isUserCreated: true,
    };
    setUserRecipes((prev) => {
      const next = [...prev, newRecipe];
      saveJSON(USER_RECIPES_KEY, next);
      return next;
    });
    return newRecipe;
  }, []);

  /* ---- Delete a user-created recipe ---- */
  const deleteRecipe = useCallback(
    (id) => {
      setUserRecipes((prev) => {
        const next = prev.filter((r) => r.id !== id);
        saveJSON(USER_RECIPES_KEY, next);
        return next;
      });
      // Also remove from favorites if present
      setFavoriteIds((prev) => {
        const next = prev.filter((fid) => fid !== id);
        saveJSON(FAVORITES_KEY, next);
        return next;
      });
    },
    []
  );

  /* ---- Toggle favorite ---- */
  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id];
      saveJSON(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  /* ---- Check if a recipe is favorited ---- */
  const isFavorite = useCallback(
    (id) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const value = useMemo(
    () => ({
      recipes,
      favoriteIds,
      addRecipe,
      deleteRecipe,
      toggleFavorite,
      isFavorite,
    }),
    [recipes, favoriteIds, addRecipe, deleteRecipe, toggleFavorite, isFavorite]
  );

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

/**
 * useRecipes — convenience hook to consume RecipeContext.
 */
export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error('useRecipes must be used within a <RecipeProvider>');
  }
  return ctx;
}
