require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// AUTO-SEED
const autoSeed = async () => {
  try {
    const result = await db.query("SELECT COUNT(*) as count FROM recipes");
    if (parseInt(result.rows[0].count) === 0) {
      console.log("🌱 Seeding recipes...");
      console.log("✅ Skipping auto-seed");
    } else {
      console.log("✅ Recipes already seeded:", result.rows[0].count);
    }
  } catch (err) {
    console.error("❌ Seed check error:", err);
  }
};

setTimeout(autoSeed, 3000);

app.use((req, res, next) => {
  console.log("📡", req.method, req.path);
  next();
});

app.use("/admin", require("./routes/admin"));
app.use("/bmi", require("./routes/bmi"));
app.use("/auth", require("./routes/auth"));
app.use("/menu", require("./routes/menu"));
app.use("/chatbot", require("./routes/chatbot"));

app.post("/food", async (req, res) => {
  const { user_email, date, mealType, foodName, calories, carbs, protein, fat } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO food_records (user_email, date, meal_type, food_name, calories, carbs, protein, fat)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_email, date, mealType, foodName, calories, carbs, protein, fat]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save food record" });
  }
});

app.get("/food", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM food_records");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food records" });
  }
});

app.delete("/food/:id", async (req, res) => {
  if (req.headers["x-admin-key"] !== "admin123") return res.status(403).json({ error: "Admin only" });
  try {
    await db.query("DELETE FROM food_records WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

app.get("/debug/bmi/:email", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM bmi_records WHERE user_email = $1 ORDER BY date DESC",
      [req.params.email]
    );
    res.json({ email: req.params.email, count: result.rows.length, records: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
console.log("OPENAI KEY:", process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Not set");