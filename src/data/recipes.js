const recipes = [
  // INDIAN RECIPES

  {
    id: 1,
    title: "Butter Chicken",
    category: "Indian",
    cookTime: "45 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    shortDescription:
      "Creamy and rich chicken curry cooked with butter and aromatic spices.",
    servings: 4,
    calories: 490,
    ingredients: [
      "Chicken",
      "Butter",
      "Tomato puree",
      "Cream",
      "Garam masala",
      "Garlic",
      "Ginger"
    ],
    instructions: [
      "Marinate the chicken with spices.",
      "Cook chicken until tender.",
      "Prepare creamy tomato gravy.",
      "Mix chicken with gravy.",
      "Serve hot with naan or rice."
    ],
    chefTip: "Add a tablespoon of kasuri methi (dried fenugreek leaves) at the end for that authentic restaurant-style aroma.",
    nutrition: { protein: "32g", carbs: "18g", fat: "28g", fiber: "3g" }
  },

  {
    id: 2,
    title: "Hyderabadi Biryani",
    category: "Indian",
    cookTime: "1 hour",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    shortDescription:
      "Aromatic layered rice dish cooked with spices and marinated chicken.",
    servings: 6,
    calories: 520,
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Fried onions",
      "Mint leaves",
      "Biryani masala"
    ],
    instructions: [
      "Marinate chicken with spices.",
      "Cook rice partially.",
      "Layer rice and chicken.",
      "Cook on dum.",
      "Serve with raita."
    ],
    chefTip: "Seal the lid with dough to trap steam — this dum cooking method gives the biryani its signature layers of flavor.",
    nutrition: { protein: "28g", carbs: "56g", fat: "18g", fiber: "2g" }
  },

  {
    id: 3,
    title: "Paneer Tikka",
    category: "Indian",
    cookTime: "30 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
    shortDescription:
      "Grilled paneer cubes marinated with spicy yogurt mixture.",
    servings: 3,
    calories: 340,
    ingredients: [
      "Paneer",
      "Yogurt",
      "Capsicum",
      "Onion",
      "Spices"
    ],
    instructions: [
      "Prepare marinade.",
      "Coat paneer and vegetables.",
      "Skewer ingredients.",
      "Grill until golden.",
      "Serve with mint chutney."
    ],
    chefTip: "Add a squeeze of lemon juice and a pinch of chaat masala right before serving for an irresistible tangy kick.",
    nutrition: { protein: "22g", carbs: "12g", fat: "24g", fiber: "2g" }
  },

  {
    id: 4,
    title: "Masala Dosa",
    category: "Indian",
    cookTime: "40 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
    shortDescription:
      "Crispy South Indian dosa filled with spicy potato masala.",
    servings: 2,
    calories: 380,
    ingredients: [
      "Dosa batter",
      "Potatoes",
      "Onions",
      "Mustard seeds",
      "Curry leaves"
    ],
    instructions: [
      "Prepare potato filling.",
      "Spread dosa batter on pan.",
      "Cook until crispy.",
      "Add filling and fold.",
      "Serve with chutney and sambar."
    ],
    chefTip: "Let the batter ferment overnight for the crispiest, most flavorful dosas. A well-seasoned iron tawa makes all the difference.",
    nutrition: { protein: "8g", carbs: "52g", fat: "14g", fiber: "4g" }
  },

  {
    id: 5,
    title: "Chole Bhature",
    category: "Indian",
    cookTime: "50 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027",
    shortDescription:
      "Spicy chickpea curry served with fluffy fried bread.",
    servings: 4,
    calories: 560,
    ingredients: [
      "Chickpeas",
      "Onions",
      "Tomatoes",
      "Flour",
      "Spices"
    ],
    instructions: [
      "Cook chickpeas with masala.",
      "Prepare dough for bhature.",
      "Roll and deep fry.",
      "Serve hot together."
    ],
    chefTip: "Add a used tea bag while boiling chickpeas — it gives the chole a dark, rich color just like street-style Delhi chole.",
    nutrition: { protein: "18g", carbs: "64g", fat: "22g", fiber: "12g" }
  },

  // ARABIAN RECIPES

  {
    id: 6,
    title: "Chicken Shawarma",
    category: "Arabian",
    cookTime: "35 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
    shortDescription:
      "Juicy spiced chicken wrapped in pita bread with garlic sauce.",
    servings: 3,
    calories: 420,
    ingredients: [
      "Chicken",
      "Pita bread",
      "Garlic sauce",
      "Lettuce",
      "Spices"
    ],
    instructions: [
      "Marinate chicken.",
      "Grill until cooked.",
      "Prepare wrap with vegetables.",
      "Add garlic sauce.",
      "Serve warm."
    ],
    chefTip: "For the juiciest shawarma, use chicken thighs instead of breast and let the marinade sit for at least 2 hours.",
    nutrition: { protein: "34g", carbs: "38g", fat: "16g", fiber: "3g" }
  },

  {
    id: 7,
    title: "Mandi",
    category: "Arabian",
    cookTime: "1 hour",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db",
    shortDescription:
      "Traditional Arabian rice dish cooked with flavorful meat and spices.",
    servings: 5,
    calories: 580,
    ingredients: [
      "Rice",
      "Chicken",
      "Arabian spices",
      "Dry lemon",
      "Onions"
    ],
    instructions: [
      "Cook spiced chicken.",
      "Prepare flavored rice.",
      "Combine and steam together.",
      "Serve with sauce."
    ],
    chefTip: "Smoke the rice using a small piece of charcoal placed in foil with ghee — this gives Mandi its distinctive smoky flavor.",
    nutrition: { protein: "30g", carbs: "62g", fat: "20g", fiber: "2g" }
  },

  {
    id: 8,
    title: "Falafel",
    category: "Arabian",
    cookTime: "25 mins",
    difficulty: "Easy",
    image: "/images/falafel.png",
    shortDescription:
      "Crispy deep-fried chickpea balls served with dips and pita.",
    servings: 4,
    calories: 310,
    ingredients: [
      "Chickpeas",
      "Parsley",
      "Garlic",
      "Onion",
      "Flour"
    ],
    instructions: [
      "Blend ingredients.",
      "Shape into balls.",
      "Deep fry until crispy.",
      "Serve with hummus."
    ],
    chefTip: "Use soaked dried chickpeas instead of canned for a much better texture — canned chickpeas make the falafel fall apart.",
    nutrition: { protein: "14g", carbs: "36g", fat: "12g", fiber: "6g" }
  },

  {
    id: 9,
    title: "Hummus",
    category: "Arabian",
    cookTime: "15 mins",
    difficulty: "Easy",
    image: "/images/hummus.png",
    shortDescription:
      "Creamy chickpea dip served with pita bread.",
    servings: 6,
    calories: 180,
    ingredients: [
      "Chickpeas",
      "Tahini",
      "Olive oil",
      "Garlic",
      "Lemon juice"
    ],
    instructions: [
      "Blend all ingredients.",
      "Adjust consistency.",
      "Serve with olive oil drizzle."
    ],
    chefTip: "Peel the chickpea skins before blending for the silkiest, creamiest hummus you'll ever taste.",
    nutrition: { protein: "8g", carbs: "20g", fat: "10g", fiber: "5g" }
  },

  {
    id: 10,
    title: "Kunafa",
    category: "Arabian",
    cookTime: "40 mins",
    difficulty: "Medium",
    image: "/images/kunafa.png",
    shortDescription:
      "Sweet Middle Eastern dessert with cheese and crispy pastry.",
    servings: 8,
    calories: 440,
    ingredients: [
      "Kunafa dough",
      "Cheese",
      "Butter",
      "Sugar syrup"
    ],
    instructions: [
      "Layer dough and cheese.",
      "Bake until golden.",
      "Pour sugar syrup.",
      "Serve warm."
    ],
    chefTip: "Use a mix of mozzarella and akkawi cheese for the perfect stretch — and always pour the syrup while the kunafa is still piping hot.",
    nutrition: { protein: "10g", carbs: "52g", fat: "22g", fiber: "1g" }
  },

  // RANDOM RECIPES

  {
    id: 11,
    title: "Margherita Pizza",
    category: "Italian",
    cookTime: "30 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    shortDescription:
      "Classic Italian pizza with cheese, basil, and tomato sauce.",
    servings: 2,
    calories: 410,
    ingredients: [
      "Pizza dough",
      "Cheese",
      "Tomato sauce",
      "Basil"
    ],
    instructions: [
      "Prepare pizza base.",
      "Add toppings.",
      "Bake until crispy.",
      "Serve hot."
    ],
    chefTip: "Preheat your oven to the highest temperature and use a pizza stone for a perfectly crispy, charred crust like a Neapolitan pizzeria.",
    nutrition: { protein: "18g", carbs: "48g", fat: "16g", fiber: "3g" }
  },

  {
    id: 12,
    title: "Sushi Rolls",
    category: "Japanese",
    cookTime: "50 mins",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    shortDescription:
      "Japanese rice rolls filled with seafood and vegetables.",
    servings: 4,
    calories: 350,
    ingredients: [
      "Sushi rice",
      "Nori sheets",
      "Salmon",
      "Cucumber"
    ],
    instructions: [
      "Prepare sushi rice.",
      "Place fillings.",
      "Roll tightly.",
      "Slice and serve."
    ],
    chefTip: "Wet your hands and knife with rice vinegar water to prevent sticking — and always use a sharp knife for clean cuts.",
    nutrition: { protein: "20g", carbs: "46g", fat: "8g", fiber: "2g" }
  },

  {
    id: 13,
    title: "Tacos",
    category: "Mexican",
    cookTime: "20 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    shortDescription:
      "Crunchy taco shells filled with meat and fresh vegetables.",
    servings: 3,
    calories: 380,
    ingredients: [
      "Taco shells",
      "Chicken",
      "Lettuce",
      "Cheese",
      "Sauce"
    ],
    instructions: [
      "Cook filling.",
      "Prepare vegetables.",
      "Assemble tacos.",
      "Serve fresh."
    ],
    chefTip: "Warm your taco shells in the oven for 2 minutes before assembling — it brings out the corn flavor and adds a satisfying crunch.",
    nutrition: { protein: "22g", carbs: "32g", fat: "18g", fiber: "4g" }
  },

  {
    id: 14,
    title: "Cheeseburger",
    category: "American",
    cookTime: "25 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    shortDescription:
      "Juicy beef burger layered with cheese and vegetables.",
    servings: 2,
    calories: 620,
    ingredients: [
      "Burger buns",
      "Beef patty",
      "Cheese",
      "Tomatoes",
      "Lettuce"
    ],
    instructions: [
      "Cook beef patty.",
      "Toast buns.",
      "Assemble burger.",
      "Serve hot."
    ],
    chefTip: "Don't press down on the patty while cooking — you'll squeeze out all the juices. Let the meat rest for 2 minutes after grilling.",
    nutrition: { protein: "36g", carbs: "40g", fat: "32g", fiber: "2g" }
  },

  {
    id: 15,
    title: "Chocolate Cake",
    category: "Dessert",
    cookTime: "1 hour",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    shortDescription:
      "Rich and moist chocolate cake topped with creamy frosting.",
    servings: 10,
    calories: 480,
    ingredients: [
      "Flour",
      "Cocoa powder",
      "Sugar",
      "Eggs",
      "Butter"
    ],
    instructions: [
      "Prepare cake batter.",
      "Bake in oven.",
      "Cool completely.",
      "Apply frosting and serve."
    ],
    chefTip: "Use hot coffee instead of water in the batter — it deepens the chocolate flavor without making the cake taste like coffee.",
    nutrition: { protein: "6g", carbs: "58g", fat: "24g", fiber: "3g" }
  }
];

export default recipes;