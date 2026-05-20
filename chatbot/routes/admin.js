const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/user-count", async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) AS total FROM users");
    res.json({ total: result.rows[0].total });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.get("/avg-calories", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT ROUND(AVG(total_calories), 0) AS avgcalories
      FROM (
        SELECT user_email, SUM(calories) AS total_calories
        FROM food_records
        GROUP BY user_email
      ) sub
    `);
    res.json({ avgCalories: result.rows[0].avgcalories || 0 });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT id, email, role FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.get("/bmi", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bmi_records ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;