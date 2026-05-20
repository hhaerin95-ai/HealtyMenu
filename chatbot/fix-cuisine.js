// fix-cuisine.js
// Run: node fix-cuisine.js
// Properly sets cuisine_type = 'western' for all western meals

const db = require('./db');

const westernNames = [
  // Underweight western
  'Pancakes with Maple Syrup',
  'French Toast with Berries',
  'Eggs Benedict',
  'Beef Burger with Fries',
  'Spaghetti Bolognese',
  'Club Sandwich',
  'Grilled Steak with Mashed Potato',
  'Creamy Chicken Pasta',
  'Chocolate Muffin',
  'Cheese & Crackers',
  'Avocado Toast with Poached Egg',
  'Veggie Omelette',
  'Grilled Salmon Salad',
  'Turkey & Veggie Wrap',
  'Baked Cod with Roasted Veg',
  'Quinoa Buddha Bowl',
  'Berry Protein Smoothie',
  'Celery with Almond Butter',

  // Normal western
  'Granola with Milk',
  'Bacon & Egg Toast',
  'Caesar Salad with Chicken',
  'BLT Sandwich',
  'Chicken Chop with Coleslaw',
  'Fish & Chips',
  'Chocolate Chip Cookies (2pcs)',
  'Banana Bread Slice',
  'Smoked Salmon Bagel (Wholemeal)',
  'Egg White Omelette with Spinach',
  'Nicoise Salad',
  'Grilled Chicken & Quinoa Bowl',
  'Herb Crusted Salmon',
  'Zucchini Noodles with Pesto Chicken',
  'Mixed Berries with Yogurt',

  // Overweight western
  'Boiled Egg with Toast',
  'Cereal with Skim Milk',
  'Tuna Sandwich (Wholemeal)',
  'Garden Salad with Grilled Chicken',
  'Baked Chicken with Steamed Veg',
  'Minestrone Soup with Bread',
  'Rice Cake with Peanut Butter',
  'Apple Slices with Cinnamon',
  'Chia Overnight Oats',
  'Spinach & Mushroom Omelette',
  'Lentil & Veggie Soup',
  'Grilled Chicken Caesar (No Crouton)',
  'Baked Salmon with Asparagus',
  'Turkey Meatball with Zucchini Noodle',
  'Walnuts & Dark Chocolate',
  'Cucumber & Hummus',

  // Obese western
  'Poached Egg on Wholemeal Toast',
  'Low Fat Yogurt Parfait',
  'Grilled Chicken Salad',
  'Chicken Soup (No Noodle)',
  'Steamed Broccoli with Grilled Chicken',
  'Baked Fish with Salad',
  'Sliced Apple',
  'Carrot Sticks',
  'Flaxseed Smoothie',
  'Egg & Veggie Scramble',
  'Tuna & Avocado Salad',
  'Cauliflower Rice Bowl with Chicken',
  'Grilled Salmon with Steamed Broccoli',
  'Chicken & Veg Lettuce Wrap',
  'Almonds (Small Handful)',
  'Cucumber with Greek Yogurt Dip',

  // Misclassified ones
  'Chicken Chop with Fries',
];

const placeholders = westernNames.map(() => '?').join(', ');

db.run(
  `UPDATE recipes SET cuisine_type = 'western' WHERE name IN (${placeholders})`,
  westernNames,
  function(err) {
    if (err) {
      console.error('❌ Error:', err);
    } else {
      console.log(`✅ Updated ${this.changes} rows to cuisine_type = 'western'`);
    }

    // verify
    db.all(
      `SELECT cuisine_type, COUNT(*) as cnt FROM recipes GROUP BY cuisine_type`,
      [],
      (err2, rows) => {
        if (!err2) {
          console.log('\n📊 Cuisine breakdown:');
          console.table(rows);
        }
        process.exit(0);
      }
    );
  }
);