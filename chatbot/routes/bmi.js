const express = require("express");
const router = express.Router();
const db = require("../db");

// POST - Simpan BMI baru
router.post("/", (req, res) => {
  const { user_email, height, weight, bmi, category } = req.body;

  if (!user_email || !height || !weight || !bmi || !category) {
    return res.status(400).json({ error: "Incomplete BMI data" });
  }

  const date = new Date().toISOString().split("T")[0];

  db.run(
    `INSERT INTO bmi_records 
     (user_email, height, weight, bmi, category, date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_email, height, weight, bmi, category, date],
    function (err) {
      if (err) {
        console.error("❌ BMI insert error:", err);
        return res.status(500).json({ error: "Failed to save BMI" });
      }

      res.json({
        success: true,
        id: this.lastID
      });
    }
  );
});

// GET - Ambil BMI terkini untuk user
router.get("/latest", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  db.get(
    `SELECT * FROM bmi_records 
     WHERE user_email = ? 
     ORDER BY date DESC 
     LIMIT 1`,
    [email],
    (err, row) => {
      if (err) {
        console.error("❌ BMI fetch error:", err);
        return res.status(500).json({ error: "Failed to fetch BMI" });
      }

      if (!row) {
        return res.status(404).json({ error: "No BMI record found" });
      }

      res.json(row);
    }
  );
});

module.exports = router;