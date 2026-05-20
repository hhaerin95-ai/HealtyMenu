const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/7-day-plan", async (req, res) => {
  const { bmi, budget, pcos, cuisine } = req.query;

  if (!bmi) return res.status(400).json({ error: "BMI required" });

  const bmiValue = parseFloat(bmi);
  let bmiCategory;
  if (bmiValue < 18.5) bmiCategory = "Underweight";
  else if (bmiValue < 25) bmiCategory = "Normal Weight";
  else if (bmiValue < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  try {
    let query = `SELECT * FROM recipes WHERE bmi_category = $1`;
    const params = [bmiCategory];
    let i = 2;

    if (budget) {
      query += ` AND budget_category = $${i++}`;
      params.push(budget);
    }

    if (pcos === "true" || pcos === "1") {
      query += ` AND is_pcos_friendly = 1`;
    }

    if (cuisine && cuisine !== "" && cuisine !== "all") {
      query += ` AND cuisine_type = $${i++}`;
      params.push(cuisine);
    }

    const result = await db.query(query, params);
    const recipes = result.rows;

    if (recipes.length === 0) {
      // Fallback: get any recipes ignoring pcos/cuisine filter
      const fallback = await db.query(
        `SELECT * FROM recipes WHERE bmi_category = $1 LIMIT 50`,
        [bmiCategory]
      );
      if (fallback.rows.length === 0) {
        return res.json({ success: false, error: "No recipes found" });
      }
      recipes.push(...fallback.rows);
    }

    // Group recipes by meal category
    const byType = {
      breakfast: recipes.filter(r => r.category === "breakfast"),
      morningSnack: recipes.filter(r => r.category === "morning_snack" || r.category === "snack"),
      lunch: recipes.filter(r => r.category === "lunch"),
      afternoonSnack: recipes.filter(r => r.category === "afternoon_snack" || r.category === "snack"),
      dinner: recipes.filter(r => r.category === "dinner"),
    };

    // Helper: pick random item from array
    function pick(arr, fallbackArr) {
      const source = arr.length > 0 ? arr : (fallbackArr || []);
      if (source.length === 0) return null;
      return source[Math.floor(Math.random() * source.length)];
    }

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const plan = dayNames.map((dayName) => {
      const breakfast = pick(byType.breakfast, recipes);
      const morningSnack = pick(byType.morningSnack, byType.breakfast);
      const lunch = pick(byType.lunch, recipes);
      const afternoonSnack = pick(byType.afternoonSnack, byType.lunch);
      const dinner = pick(byType.dinner, recipes);

      const meals = { breakfast, morningSnack, lunch, afternoonSnack, dinner };

      const totalCalories = Object.values(meals).reduce((sum, m) => sum + (m ? Number(m.calories) || 0 : 0), 0);
      const totalCost = Object.values(meals).reduce((sum, m) => sum + (m ? Number(m.price_rm) || 0 : 0), 0);

      return {
        dayName,
        meals,
        totals: {
          calories: Math.round(totalCalories),
          cost: totalCost.toFixed(2),
        },
      };
    });

    const avgDailyCalories = Math.round(plan.reduce((s, d) => s + d.totals.calories, 0) / 7);
    const avgDailyCost = (plan.reduce((s, d) => s + parseFloat(d.totals.cost), 0) / 7).toFixed(2);
    const totalCost = plan.reduce((s, d) => s + parseFloat(d.totals.cost), 0).toFixed(2);

    res.json({
      success: true,
      plan,
      summary: {
        avgDailyCalories,
        avgDailyCost,
        totalCost,
        bmiCategory,
      },
    });
  } catch (err) {
    console.error("❌ Menu error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;