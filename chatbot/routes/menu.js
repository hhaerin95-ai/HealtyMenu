const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/7-day-plan", async (req, res) => {
  const { bmi, budget, pcos, cuisine } = req.query;

  if (!bmi) return res.status(400).json({ error: "BMI required" });

  const bmiValue = parseFloat(bmi);
  let bmiCategory;
  if (bmiValue < 18.5) bmiCategory = "Underweight";
  else if (bmiValue < 25) bmiCategory = "Normal";
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
    } else {
      query += ` AND is_pcos_friendly = 0`;
    }

    if (cuisine && cuisine !== "" && cuisine !== "all") {
      query += ` AND cuisine_type = $${i++}`;
      params.push(cuisine);
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Menu error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;