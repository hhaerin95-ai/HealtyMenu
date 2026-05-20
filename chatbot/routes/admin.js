const express = require("express");
const router = express.Router();
const db = require("../db");

// 👥 TOTAL USERS
router.get("/user-count", (req, res) => {
  db.get(
    "SELECT COUNT(*) AS total FROM users",
    [],
    (err, row) => {
      if (err) {
        console.error("❌ Failed to count users:", err);
        return res.status(500).json({ error: "DB error" });
      }

      res.json({ total: row.total });
    }
  );
});
router.get("/avg-calories", (req, res) => {
  db.get(
    `
    SELECT 
      ROUND(AVG(totalCalories), 0) AS avgCalories
    FROM (
      SELECT user_email, SUM(calories) AS totalCalories
      FROM food_records
      GROUP BY user_email
    )
    `,
    [],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json({ avgCalories: row?.avgCalories || 0 });
    }
  );
});
// 👥 Get all users
router.get("/users", (req, res) => {
  db.all(
    "SELECT id, email, role FROM users ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(rows);
    }
  );
});
router.get("/bmi", (req, res) => {
  db.all(
    "SELECT * FROM bmi_records ORDER BY date DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

module.exports = router;
