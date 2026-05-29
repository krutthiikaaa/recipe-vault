import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import defaultRecipes from '../data/recipes';

const RecipeContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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

const FAVORITES_KEY = 'rv_favorites';

function normalizeRecipe(recipe) {
  return {
    ...recipe,
    id: recipe.id || recipe._id || recipe._id,
    isUserCreated: true,
  };
}

export function RecipeProvider({ children }) {
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(() =>
    loadJSON(FAVORITES_KEY, [])
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        if (!response.ok) {
          throw new Error('Failed to load recipes');
        }
        const data = await response.json();
        setUserRecipes(data.map(normalizeRecipe));
      } catch (error) {
        console.error('Recipe load failed:', error);
        setUserRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const recipes = useMemo(() => {
    const tagged = defaultRecipes.map((r) => ({
      ...r,
      isUserCreated: false,
    }));
    return [...tagged, ...userRecipes];
  }, [userRecipes]);

  const addRecipe = useCallback(async (recipeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      const savedRecipeRaw = await response.json();
      const savedRecipe = normalizeRecipe(savedRecipeRaw);
      setUserRecipes((prev) => [...prev, savedRecipe]);
      return savedRecipe;
    } catch (error) {
      console.error('Add recipe failed:', error);
      return null;
    }
  }, []);

  const updateRecipe = useCallback(async (id, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }
      const updatedRecipeRaw = await response.json();
      const updatedRecipe = normalizeRecipe(updatedRecipeRaw);
      setUserRecipes((prev) =>
        prev.map((recipe) =>
          String(recipe.id) === String(id) ? updatedRecipe : recipe
        )
      );
      return updatedRecipe;
    } catch (error) {
      console.error('Update recipe failed:', error);
      return null;
    }
  }, []);

  const deleteRecipe = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
      setUserRecipes((prev) => prev.filter((r) => String(r.id) !== String(id)));
    } catch (error) {
      console.error('Delete recipe failed:', error);
    }

    setFavoriteIds((prev) => {
      const next = prev.filter((fid) => String(fid) !== String(id));
      saveJSON(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id];
      saveJSON(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const value = useMemo(
    () => ({
      recipes,
      favoriteIds,
      isLoading,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
      isFavorite,
    }),
    [recipes, favoriteIds, isLoading, addRecipe, updateRecipe, deleteRecipe, toggleFavorite, isFavorite]
  );

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error('useRecipes must be used within a <RecipeProvider>');
  }
  return ctx;
}
