require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// AUTO-SEED RECIPES
db.get("SELECT COUNT(*) as count FROM recipes", [], (err, row) => {
  if (err || row.count > 0) return;
  console.log("🌱 Seeding recipes...");
  require("./seed-local-dishes");
  require("./seed-more-meals");
  require("./seed-missing-meals");
  require("./seed-pcos-western-meals");
});

// LOG
app.use((req, res, next) => {
  console.log("📡", req.method, req.path);
  next();
});

// ROUTES
app.use("/admin", require("./routes/admin"));
app.use("/bmi", require("./routes/bmi"));
app.use("/auth", require("./routes/auth"));
app.use("/menu", require("./routes/menu"));
app.use("/chatbot", require("./routes/chatbot"));

// FOOD ROUTES
app.post("/food", (req, res) => {
  const { user_email, date, mealType, foodName, calories, carbs, protein, fat } = req.body;
  db.run(
    `INSERT INTO food_records 
     (user_email, date, mealType, foodName, calories, carbs, protein, fat)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_email, date, mealType, foodName, calories, carbs, protein, fat],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.get("/food", (req, res) => {
  db.all("SELECT * FROM food_records", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.delete("/food/:id", (req, res) => {
  if (req.headers["x-admin-key"] !== "admin123") {
    return res.status(403).json({ error: "Admin only" });
  }
  db.run("DELETE FROM food_records WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.get("/admin/user-count", (req, res) => {
  db.get("SELECT COUNT(*) as total FROM users", [], (err, row) => {
    if (err) return res.status(500).json(err);
    res.json({ total: row.total });
  });
});

app.get("/debug/bmi/:email", (req, res) => {
  db.all(
    "SELECT * FROM bmi_records WHERE user_email = ? ORDER BY date DESC",
    [req.params.email],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ email: req.params.email, count: rows.length, records: rows });
    }
  );
});

app.get("/debug/all-users", (req, res) => {
  db.all(
    "SELECT user_email, COUNT(*) as count, MAX(date) as latest_date FROM bmi_records GROUP BY user_email",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ total_users: rows.length, users: rows });
    }
  );
});

// LISTEN
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

console.log("OPENAI KEY:", process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Not set");