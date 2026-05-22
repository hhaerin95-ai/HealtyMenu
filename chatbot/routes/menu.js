const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../db");

router.get("/7-day-plan", async (req, res) => {
  const { bmi, budget, pcos, cuisine } = req.query;

  console.log("🔍 Query params:", { bmi, budget, pcos, cuisine });

  if (!bmi) return res.status(400).json({ error: "BMI required" });

  const bmiValue = parseFloat(bmi);
  let bmiCategory;

  if (bmiValue < 18.5) bmiCategory = "Underweight";
  else if (bmiValue < 25) bmiCategory = "Normal";
  else if (bmiValue < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  let query = `SELECT * FROM recipes WHERE bmi_category = $1`;
  const params = [bmiCategory];
  let i = 2;

  if (budget) { query += ` AND budget_category = $${i++}`; params.push(budget); }
  if (pcos === "true" || pcos === "1") {
    query += ` AND is_pcos_friendly = 1`;
  } else {
    query += ` AND is_pcos_friendly = 0`;
  }
  if (cuisine && cuisine !== "" && cuisine !== "all") {
    query += ` AND cuisine_type = $${i++}`;
    params.push(cuisine);
  }

  try {
    const result = await db.query(query, params);
    const meals = result.rows;

    if (!meals || meals.length === 0) return res.json({ success: false, message: "No meals found" });

    const categories = {
      breakfast: { local: [], western: [] },
      lunch: { local: [], western: [] },
      dinner: { local: [], western: [] },
      snack: { local: [], western: [] }
    };

    meals.forEach(meal => {
      const cat = meal.category || "snack";
      const ct = meal.cuisine_type || "western";
      if (categories[cat]) {
        if (ct === "local") categories[cat].local.push(meal);
        else categories[cat].western.push(meal);
      }
    });

    const days = ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"];
    const plan = [];
    const usedMealIds = new Set();

    for (let i = 0; i < 7; i++) {
      const isLocalDay = i % 2 === 0;
      const day = {
        day: i + 1,
        dayName: days[i],
        meals: {
          breakfast: null, morningSnack: null,
          lunch: null, afternoonSnack: null, dinner: null
        }
      };

      if (cuisine && cuisine !== "" && cuisine !== "all") {
        day.meals.breakfast = getUniqueMeal(categories.breakfast, cuisine, usedMealIds);
        day.meals.morningSnack = getUniqueMeal(categories.snack, cuisine, usedMealIds);
        day.meals.lunch = getUniqueMeal(categories.lunch, cuisine, usedMealIds);
        day.meals.afternoonSnack = getUniqueMeal(categories.snack, cuisine, usedMealIds);
        day.meals.dinner = getUniqueMeal(categories.dinner, cuisine, usedMealIds);
      } else {
        day.meals.breakfast = getUniqueMeal(categories.breakfast, isLocalDay ? "local" : "western", usedMealIds);
        day.meals.morningSnack = getUniqueMeal(categories.snack, isLocalDay ? "local" : "western", usedMealIds);
        day.meals.lunch = getUniqueMeal(categories.lunch, !isLocalDay ? "local" : "western", usedMealIds);
        day.meals.afternoonSnack = getUniqueMeal(categories.snack, !isLocalDay ? "local" : "western", usedMealIds);
        day.meals.dinner = getUniqueMeal(categories.dinner, isLocalDay ? "local" : "western", usedMealIds);
      }

      day.totals = {
        calories: Math.round(
          (day.meals.breakfast?.calories || 0) + (day.meals.morningSnack?.calories || 0) +
          (day.meals.lunch?.calories || 0) + (day.meals.afternoonSnack?.calories || 0) +
          (day.meals.dinner?.calories || 0)
        ),
        cost: parseFloat((
          (day.meals.breakfast?.price_rm || 0) + (day.meals.morningSnack?.price_rm || 0) +
          (day.meals.lunch?.price_rm || 0) + (day.meals.afternoonSnack?.price_rm || 0) +
          (day.meals.dinner?.price_rm || 0)
        ).toFixed(2))
      };

      plan.push(day);
    }

    const summary = {
      totalCost: plan.reduce((s, d) => s + d.totals.cost, 0).toFixed(2),
      avgDailyCost: (plan.reduce((s, d) => s + d.totals.cost, 0) / 7).toFixed(2),
      avgDailyCalories: Math.round(plan.reduce((s, d) => s + d.totals.calories, 0) / 7)
    };

    res.json({ success: true, bmiCategory, plan, summary });
  } catch (err) {
    console.error("❌ Menu error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

function getUniqueMeal(categoryData, preferredCuisine, usedIds) {
  let availableMeals = preferredCuisine === "local"
    ? categoryData.local.filter(m => !usedIds.has(m.id))
    : categoryData.western.filter(m => !usedIds.has(m.id));

  if (availableMeals.length === 0)
    availableMeals = [...categoryData.local, ...categoryData.western].filter(m => !usedIds.has(m.id));

  if (availableMeals.length === 0)
    availableMeals = [...categoryData.local, ...categoryData.western];

  if (availableMeals.length === 0) return null;

  const selected = availableMeals[Math.floor(Math.random() * availableMeals.length)];
  if (usedIds.size < 30) usedIds.add(selected.id);
  return selected;
}

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, meals: [] });
    if (!process.env.SPOONACULAR_API_KEY)
      return res.status(500).json({ success: false, error: "API key not configured" });

    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: { query: q.trim(), number: 12, addRecipeNutrition: true, apiKey: process.env.SPOONACULAR_API_KEY },
      timeout: 10000
    });

    const results = response.data.results.map(r => ({
      id: r.id, name: r.title, image: r.image, mealType: "search",
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