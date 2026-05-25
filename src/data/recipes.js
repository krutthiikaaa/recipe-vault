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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },

  {
    id: 8,
    title: "Falafel",
    category: "Arabian",
    cookTime: "25 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb2",
    shortDescription:
      "Crispy deep-fried chickpea balls served with dips and pita.",
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
    ]
  },

  {
    id: 9,
    title: "Hummus",
    category: "Arabian",
    cookTime: "15 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1571197119282-7c4c1c6e3f18",
    shortDescription:
      "Creamy chickpea dip served with pita bread.",
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
    ]
  },

  {
    id: 10,
    title: "Kunafa",
    category: "Arabian",
    cookTime: "40 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1625944525533-473f1b3d54d3",
    shortDescription:
      "Sweet Middle Eastern dessert with cheese and crispy pastry.",
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

export default recipes;