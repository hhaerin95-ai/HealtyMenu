const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  try {
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) return res.status(400).json({ error: "User already exists" });

    const result = await db.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, password, "user"]
    );
    res.json({ success: true, id: result.rows[0].id, email, role: "user" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid login" });

    const user = result.rows[0];
    res.json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;