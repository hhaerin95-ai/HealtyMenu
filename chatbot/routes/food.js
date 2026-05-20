const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { date, mealType, foodName, calories, carbs, protein, fat } = req.body;

  if (!foodName) {
  return res.status(400).json({ error: "Food name missing" });
}


  db.run(
    `INSERT INTO food_records 
     (date, mealType, foodName, calories, carbs, protein, fat)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [date, mealType, foodName, calories, carbs, protein, fat],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM food_records ORDER BY date DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
