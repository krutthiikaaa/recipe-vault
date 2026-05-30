import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle, Zap, Users, Lightbulb, Save } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import '../styles/AddRecipe.css';

const CATEGORY_OPTIONS = [
  'Indian',
  'Arabian',
  'Italian',
  'Japanese',
  'Mexican',
  'American',
  'Dessert',
];

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

const EMPTY_FORM = {
  title: '',
  category: '',
  cookTime: '',
  difficulty: '',
  image: '',
  shortDescription: '',
  ingredients: '',
  instructions: '',
  servings: '',
  calories: '',
  chefTip: '',
  protein: '',
  carbs: '',
  fat: '',
  fiber: '',
};

/**
 * Convert a recipe object from context/API into flat form state.
 */
function recipeToForm(recipe) {
  return {
    title: recipe.title || '',
    category: recipe.category || '',
    cookTime: recipe.cookTime || '',
    difficulty: recipe.difficulty || '',
    image: recipe.image || '',
    shortDescription: recipe.shortDescription || '',
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join('\n')
      : recipe.ingredients || '',
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions.join('\n')
      : recipe.instructions || '',
    servings: recipe.servings != null ? String(recipe.servings) : '',
    calories: recipe.calories != null ? String(recipe.calories) : '',
    chefTip: recipe.chefTip || '',
    protein: recipe.nutrition?.protein || '',
    carbs: recipe.nutrition?.carbs || '',
    fat: recipe.nutrition?.fat || '',
    fiber: recipe.nutrition?.fiber || '',
  };
}

export default function AddRecipe() {
  const { id: editId } = useParams();            // undefined for /add-recipe
  const navigate = useNavigate();
  const { recipes, addRecipe, updateRecipe } = useRecipes();

  const isEditMode = Boolean(editId);

  /* Find the recipe being edited */
  const existingRecipe = useMemo(() => {
    if (!isEditMode) return null;
    const numericId = Number(editId);
    return recipes.find((r) => r.id === numericId || r.id === editId) || null;
  }, [editId, isEditMode, recipes]);

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  /* Pre-fill the form when editing */
  useEffect(() => {
    if (existingRecipe) {
      setForm(recipeToForm(existingRecipe));
    }
  }, [existingRecipe]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = {
      title: form.title,
      category: form.category,
      cookTime: form.cookTime,
      difficulty: form.difficulty,
      image: form.image,
      shortDescription: form.shortDescription,
      ingredients: form.ingredients.split('\n').filter(Boolean),
      instructions: form.instructions.split('\n').filter(Boolean),
      ...(form.servings && { servings: Number(form.servings) }),
      ...(form.calories && { calories: Number(form.calories) }),
      ...(form.chefTip.trim() && { chefTip: form.chefTip.trim() }),
      ...((form.protein || form.carbs || form.fat || form.fiber) && {
        nutrition: {
          ...(form.protein && { protein: form.protein }),
          ...(form.carbs && { carbs: form.carbs }),
          ...(form.fat && { fat: form.fat }),
          ...(form.fiber && { fiber: form.fiber }),
        },
      }),
    };

    if (isEditMode) {
      const updated = await updateRecipe(editId, recipe);
      if (updated) {
        setToastMessage('Recipe updated successfully!');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate(`/recipe/${editId}`);
        }, 1500);
      }
    } else {
      const savedRecipe = await addRecipe(recipe);
      if (savedRecipe) {
        setToastMessage('Recipe added successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setForm({ ...EMPTY_FORM });
      }
    }
  };

  return (
    <div className="add-recipe">
      {/* ======== Header ======== */}
      <header className="add-recipe__header">
        <span className="add-recipe__badge">
          {isEditMode ? (
            <>
              <Save className="add-recipe__badge-icon" />
              Edit Your Recipe
            </>
          ) : (
            <>
              <PlusCircle className="add-recipe__badge-icon" />
              Share Your Recipe
            </>
          )}
        </span>
        <h1 className="add-recipe__title">
          {isEditMode ? (
            <>
              Edit <span className="add-recipe__title-accent">Recipe</span>
            </>
          ) : (
            <>
              Add a <span className="add-recipe__title-accent">New Recipe</span>
            </>
          )}
        </h1>
        <p className="add-recipe__description">
          {isEditMode
            ? 'Update the details of your recipe below. Changes will be saved immediately.'
            : 'Share your culinary creations with the community. Fill in the details below and your recipe will be added to the vault.'}
        </p>
      </header>

      {/* ======== Form ======== */}
      <div className="add-recipe__form-wrapper">
        <form className="add-recipe__form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-group__label" htmlFor="title">
              Recipe Title <span>*</span>
            </label>
            <input
              className="form-group__input"
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Creamy Butter Chicken"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category & Difficulty row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-group__label" htmlFor="category">
                Category <span>*</span>
              </label>
              <select
                className="form-group__select"
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="difficulty">
                Difficulty <span>*</span>
              </label>
              <select
                className="form-group__select"
                id="difficulty"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select difficulty
                </option>
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cook Time & Image URL row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-group__label" htmlFor="cookTime">
                Cook Time <span>*</span>
              </label>
              <input
                className="form-group__input"
                type="text"
                id="cookTime"
                name="cookTime"
                placeholder="e.g. 45 mins"
                value={form.cookTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="image">
                Image URL
              </label>
              <input
                className="form-group__input"
                type="url"
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label className="form-group__label" htmlFor="shortDescription">
              Short Description <span>*</span>
            </label>
            <input
              className="form-group__input"
              type="text"
              id="shortDescription"
              name="shortDescription"
              placeholder="A brief one-line description of your recipe"
              value={form.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ingredients */}
          <div className="form-group">
            <label className="form-group__label" htmlFor="ingredients">
              Ingredients <span>*</span>
            </label>
            <textarea
              className="form-group__textarea"
              id="ingredients"
              name="ingredients"
              placeholder="Enter each ingredient on a new line"
              value={form.ingredients}
              onChange={handleChange}
              required
            />
            <span className="form-group__hint">
              One ingredient per line (e.g. 2 cups flour)
            </span>
          </div>

          {/* Instructions */}
          <div className="form-group">
            <label className="form-group__label" htmlFor="instructions">
              Instructions <span>*</span>
            </label>
            <textarea
              className="form-group__textarea"
              id="instructions"
              name="instructions"
              placeholder="Enter each step on a new line"
              value={form.instructions}
              onChange={handleChange}
              required
            />
            <span className="form-group__hint">
              One step per line (e.g. Preheat oven to 180°C)
            </span>
          </div>

          {/* Servings & Calories row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-group__label" htmlFor="servings">
                <Users className="form-group__label-icon" />
                Servings
              </label>
              <input
                className="form-group__input"
                type="number"
                id="servings"
                name="servings"
                placeholder="e.g. 4"
                min="1"
                value={form.servings}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="calories">
                <Zap className="form-group__label-icon" />
                Calories (per serving)
              </label>
              <input
                className="form-group__input"
                type="number"
                id="calories"
                name="calories"
                placeholder="e.g. 350"
                min="0"
                value={form.calories}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Chef Tip */}
          <div className="form-group">
            <label className="form-group__label" htmlFor="chefTip">
              <Lightbulb className="form-group__label-icon" />
              Chef's Tip
            </label>
            <textarea
              className="form-group__textarea form-group__textarea--short"
              id="chefTip"
              name="chefTip"
              placeholder="Share a pro tip for making this recipe extra special…"
              value={form.chefTip}
              onChange={handleChange}
            />
          </div>

          {/* ======== Nutrition Section ======== */}
          <fieldset className="nutrition-fieldset">
            <legend className="nutrition-fieldset__legend">
              <Zap className="nutrition-fieldset__icon" />
              Nutrition Information
              <span className="nutrition-fieldset__optional">optional</span>
            </legend>

            <div className="nutrition-fieldset__grid">
              <div className="form-group">
                <label className="form-group__label" htmlFor="protein">Protein</label>
                <input
                  className="form-group__input"
                  type="text"
                  id="protein"
                  name="protein"
                  placeholder="e.g. 24g"
                  value={form.protein}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="carbs">Carbs</label>
                <input
                  className="form-group__input"
                  type="text"
                  id="carbs"
                  name="carbs"
                  placeholder="e.g. 42g"
                  value={form.carbs}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="fat">Fat</label>
                <input
                  className="form-group__input"
                  type="text"
                  id="fat"
                  name="fat"
                  placeholder="e.g. 12g"
                  value={form.fat}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="fiber">Fiber</label>
                <input
                  className="form-group__input"
                  type="text"
                  id="fiber"
                  name="fiber"
                  placeholder="e.g. 6g"
                  value={form.fiber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Submit */}
          <button className="add-recipe__submit" type="submit">
            {isEditMode ? (
              <>
                <Save className="add-recipe__submit-icon" />
                Save Changes
              </>
            ) : (
              <>
                <PlusCircle className="add-recipe__submit-icon" />
                Add Recipe
              </>
            )}
          </button>
        </form>
      </div>

      {/* ======== Success Toast ======== */}
      <div className={`add-recipe__toast${showToast ? ' visible' : ''}`}>
        <CheckCircle className="add-recipe__toast-icon" />
        {toastMessage}
      </div>
    </div>
  );
}
