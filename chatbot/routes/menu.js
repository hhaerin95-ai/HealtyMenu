const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../db");

router.get("/7-day-plan", (req, res) => {
  const { bmi, budget, pcos, cuisine } = req.query;
  
  console.log("🔍 Query params:", { bmi, budget, pcos, cuisine });
  
  if (!bmi) return res.status(400).json({ error: "BMI required" });

  const bmiValue = parseFloat(bmi);
  let bmiCategory;

  if (bmiValue < 18.5) bmiCategory = "Underweight";
  else if (bmiValue < 25) bmiCategory = "Normal";
  else if (bmiValue < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  console.log("📊 BMI Category:", bmiCategory);
  console.log("🔄 PCOS Mode:", pcos === 'true' || pcos === '1');
  console.log("🍴 Cuisine Filter:", cuisine);

  // ✅ BUILD QUERY - Get meals by BMI
  let query = `SELECT * FROM recipes WHERE bmi_category = ?`;
  const params = [bmiCategory];

  // Budget filter
  if (budget) {
    query += ` AND budget_category = ?`;
    params.push(budget);
  }

  // PCOS filter - MUST be applied FIRST
  if (pcos === 'true' || pcos === '1') {
    query += ` AND is_pcos_friendly = 1`;
    console.log("✅ Applying PCOS filter: is_pcos_friendly = 1");
  } else {
    // Regular mode: NOT pcos friendly
    query += ` AND is_pcos_friendly = 0`;
    console.log("✅ Applying Regular filter: is_pcos_friendly = 0");
  }

  // Cuisine filter - OPTIONAL
  if (cuisine && cuisine !== '' && cuisine !== 'all') {
    query += ` AND cuisine_type = ?`;
    params.push(cuisine);
    console.log(`✅ Applying Cuisine filter: cuisine_type = ${cuisine}`);
  } else {
    console.log("✅ No cuisine filter - will mix local + western");
  }

  console.log("📝 Final Query:", query);
  console.log("📊 Params:", params);

  db.all(query, params, (err, meals) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log(`📦 Found ${meals ? meals.length : 0} meals`);

    if (!meals || meals.length === 0) {
      return res.json({ success: false, message: "No meals found" });
    }

    // ✅ ORGANIZE MEALS BY CATEGORY & CUISINE
    const categories = {
      breakfast: { local: [], western: [] },
      lunch: { local: [], western: [] },
      dinner: { local: [], western: [] },
      snack: { local: [], western: [] }
    };

    meals.forEach(meal => {
      const category = meal.category || 'snack';
      const cuisineType = meal.cuisine_type || 'western';
      
      if (categories[category]) {
        if (cuisineType === 'local') {
          categories[category].local.push(meal);
        } else {
          categories[category].western.push(meal);
        }
      }
    });

    console.log("📊 Organized meals:", {
      breakfast_local: categories.breakfast.local.length,
      breakfast_western: categories.breakfast.western.length,
      lunch_local: categories.lunch.local.length,
      lunch_western: categories.lunch.western.length,
      dinner_local: categories.dinner.local.length,
      dinner_western: categories.dinner.western.length,
      snack_local: categories.snack.local.length,
      snack_western: categories.snack.western.length
    });

    // ✅ SMART MEAL SELECTION - Different meals each day
    const days = ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad'];
    const plan = [];
    const usedMealIds = new Set();

    for (let i = 0; i < 7; i++) {
      const day = {
        day: i + 1,
        dayName: days[i],
        meals: {
          breakfast: null,
          morningSnack: null,
          lunch: null,
          afternoonSnack: null,
          dinner: null
        }
      };

      // SMART SELECTION: Alternate between local & western (if no cuisine filter)
      const isLocalDay = i % 2 === 0;

      // If cuisine filter applied, stick to that cuisine only
      if (cuisine && cuisine !== '' && cuisine !== 'all') {
        // Single cuisine mode - all meals from one cuisine
        day.meals.breakfast = getUniqueMeal(categories.breakfast, cuisine, usedMealIds);
        day.meals.morningSnack = getUniqueMeal(categories.snack, cuisine, usedMealIds);
        day.meals.lunch = getUniqueMeal(categories.lunch, cuisine, usedMealIds);
        day.meals.afternoonSnack = getUniqueMeal(categories.snack, cuisine, usedMealIds);
        day.meals.dinner = getUniqueMeal(categories.dinner, cuisine, usedMealIds);
      } else {
        // No cuisine filter - mix local & western
        day.meals.breakfast = getUniqueMeal(categories.breakfast, isLocalDay ? 'local' : 'western', usedMealIds);
        day.meals.morningSnack = getUniqueMeal(categories.snack, isLocalDay ? 'local' : 'western', usedMealIds);
        day.meals.lunch = getUniqueMeal(categories.lunch, !isLocalDay ? 'local' : 'western', usedMealIds);
        day.meals.afternoonSnack = getUniqueMeal(categories.snack, !isLocalDay ? 'local' : 'western', usedMealIds);
        day.meals.dinner = getUniqueMeal(categories.dinner, isLocalDay ? 'local' : 'western', usedMealIds);
      }

      // Calculate totals
      day.totals = {
        calories: Math.round(
          (day.meals.breakfast?.calories || 0) +
          (day.meals.morningSnack?.calories || 0) +
          (day.meals.lunch?.calories || 0) +
          (day.meals.afternoonSnack?.calories || 0) +
          (day.meals.dinner?.calories || 0)
        ),
        cost: parseFloat((
          (day.meals.breakfast?.price_rm || 0) +
          (day.meals.morningSnack?.price_rm || 0) +
          (day.meals.lunch?.price_rm || 0) +
          (day.meals.afternoonSnack?.price_rm || 0) +
          (day.meals.dinner?.price_rm || 0)
        ).toFixed(2))
      };

      plan.push(day);
    }

    const summary = {
      totalCost: plan.reduce((sum, day) => sum + day.totals.cost, 0).toFixed(2),
      avgDailyCost: (plan.reduce((sum, day) => sum + day.totals.cost, 0) / 7).toFixed(2),
      avgDailyCalories: Math.round(plan.reduce((sum, day) => sum + day.totals.calories, 0) / 7)
    };

    console.log("✅ Plan generated successfully");
    res.json({ success: true, bmiCategory, plan, summary });
  });
});

// ✅ HELPER: Get unique meal from specific cuisine
function getUniqueMeal(categoryData, preferredCuisine, usedIds) {

  let availableMeals = [];

  // 1️⃣ Try preferred cuisine
  if (preferredCuisine === 'local') {
    availableMeals = categoryData.local.filter(m => !usedIds.has(m.id));
  } else {
    availableMeals = categoryData.western.filter(m => !usedIds.has(m.id));
  }

  // 2️⃣ Fallback: mix cuisine
  if (availableMeals.length === 0) {
    availableMeals = [
      ...categoryData.local,
      ...categoryData.western
    ].filter(m => !usedIds.has(m.id));
  }

  // 3️⃣ Last fallback: allow reuse
  if (availableMeals.length === 0) {
    availableMeals = [
      ...categoryData.local,
      ...categoryData.western
    ];
  }

  // 4️⃣ Still nothing? return null
  if (availableMeals.length === 0) {
    console.warn("⚠️ No meal found in category");
    return null;
  }

  const selected = availableMeals[
    Math.floor(Math.random() * availableMeals.length)
  ];

  // 5️⃣ Soft limit reuse (not too strict)
  if (usedIds.size < 30) {
    usedIds.add(selected.id);
  }

  return selected;
}

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, meals: [] });
    if (!process.env.SPOONACULAR_API_KEY) {
      return res.status(500).json({ success: false, error: "API key not configured" });
    }

    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: { query: q.trim(), number: 12, addRecipeNutrition: true, apiKey: process.env.SPOONACULAR_API_KEY },
      timeout: 10000
    });

    const results = response.data.results.map(r => ({
      id: r.id,
      name: r.title,
      image: r.image,
      mealType: "search",
      calories: Math.round(r.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0),
      carbs: Math.round(r.nutrition?.nutrients?.find(n => n.name === "Carbohydrates")?.amount || 0),
      protein: Math.round(r.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 0),
      fat: Math.round(r.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || 0),
      recipe: null
    }));

    res.json({ success: true, meals: results });
  } catch (err) {
    res.status(500).json({ success: false, error: "Search failed" });
  }
});

module.exports = router;