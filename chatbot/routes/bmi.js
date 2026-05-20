const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { user_email, height, weight, bmi, category } = req.body;

  if (!user_email || !height || !weight || !bmi || !category) {
    return res.status(400).json({ error: "Incomplete BMI data" });
  }

  const date = new Date().toISOString().split("T")[0];

  try {
    const result = await db.query(
      `INSERT INTO bmi_records (user_email, height, weight, bmi, category, date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_email, height, weight, bmi, category, date]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("❌ BMI insert error:", err);
    res.status(500).json({ error: "Failed to save BMI" });
  }
});

router.get("/latest", async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const result = await db.query(
      `SELECT * FROM bmi_records WHERE user_email = $1 ORDER BY date DESC LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No BMI record found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ BMI fetch error:", err);
    res.status(500).json({ error: "Failed to fetch BMI" });
  }
});

module.exports = router;