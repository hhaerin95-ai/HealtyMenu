const express = require("express");
const router = express.Router();
const db = require("../db");

// 📝 SIGNUP (dengan detailed logging)
router.post("/signup", (req, res) => {
  console.log("📥 Signup request received:", req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ error: "Email and password required" });
  }

  // Check kalau user dah wujud
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("❌ DB error checking user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (row) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert user baru
    db.run(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, password, "user"],
      function(err) {
        if (err) {
          console.error("❌ Failed to insert user:", err);
          return res.status(500).json({ error: "Failed to create user" });
        }

        console.log("✅ User created successfully:", email);
        res.json({
          success: true,
          id: this.lastID,
          email: email,
          role: "user"
        });
      }
    );
  });
});

// 🔐 LOGIN
router.post("/login", (req, res) => {
  console.log("📥 Login request received:", req.body);
  
  const { email, password } = req.body;

  // Check database untuk SEMUA users (termasuk admin)
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.error("❌ DB error during login:", err);
        return res.status(500).json({ error: "DB error" });
      }

      if (!row) {
        console.log("❌ Invalid login attempt for:", email);
        return res.status(401).json({ error: "Invalid login" });
      }

      console.log("✅ Login successful:", email, "Role:", row.role);
      res.json({
        id: row.id,
        email: row.email,
        role: row.role
      });
    }
  );
});



module.exports = router;