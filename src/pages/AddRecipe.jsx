import { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
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
};

export default function AddRecipe() {
  const { addRecipe } = useRecipes();
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the recipe object and add to context + localStorage
    addRecipe({
      title: form.title,
      category: form.category,
      cookTime: form.cookTime,
      difficulty: form.difficulty,
      image: form.image,
      shortDescription: form.shortDescription,
      ingredients: form.ingredients.split('\n').filter(Boolean),
      instructions: form.instructions.split('\n').filter(Boolean),
    });

    // Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Reset form
    setForm({ ...EMPTY_FORM });
  };

  return (
    <div className="add-recipe">
      {/* ======== Header ======== */}
      <header className="add-recipe__header">
        <span className="add-recipe__badge">
          <PlusCircle className="add-recipe__badge-icon" />
          Share Your Recipe
        </span>
        <h1 className="add-recipe__title">
          Add a <span className="add-recipe__title-accent">New Recipe</span>
        </h1>
        <p className="add-recipe__description">
          Share your culinary creations with the community. Fill in the details
          below and your recipe will be added to the vault.
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

          {/* Submit */}
          <button className="add-recipe__submit" type="submit">
            <PlusCircle className="add-recipe__submit-icon" />
            Add Recipe
          </button>
        </form>
      </div>

      {/* ======== Success Toast ======== */}
      <div className={`add-recipe__toast${showToast ? ' visible' : ''}`}>
        <CheckCircle className="add-recipe__toast-icon" />
        Recipe added successfully!
      </div>
    </div>
  );
}
