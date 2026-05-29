const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  protein: String,
  carbs: String,
  fat: String,
  fiber: String,
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  cookTime: String,
  difficulty: String,
  image: String,
  shortDescription: String,
  ingredients: { type: [String], default: [] },
  instructions: { type: [String], default: [] },
  servings: Number,
  calories: Number,
  chefTip: String,
  nutrition: nutritionSchema,
  isUserCreated: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);
