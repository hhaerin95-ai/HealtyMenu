const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// CREATE TABLES
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user'
      )
    `);

    await pool.query(`
      INSERT INTO users (email, password, role)
      VALUES ('admin@healthymenu.com', 'admin123', 'admin')
      ON CONFLICT (email) DO NOTHING
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS food_records (
        id SERIAL PRIMARY KEY,
        user_email TEXT,
        date TEXT,
        meal_type TEXT,
        food_name TEXT,
        calories INTEGER,
        carbs INTEGER,
        protein INTEGER,
        fat INTEGER
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bmi_records (
        id SERIAL PRIMARY KEY,
        user_email TEXT,
        height REAL,
        weight REAL,
        bmi REAL,
        category TEXT,
        date TEXT
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        name TEXT,
        name_ms TEXT,
        category TEXT,
        bmi_category TEXT,
        calories INTEGER,
        protein REAL,
        carbs REAL,
        fat REAL,
        price_rm REAL,
        budget_category TEXT,
        is_pcos_friendly INTEGER DEFAULT 0,
        is_low_gi INTEGER DEFAULT 0,
        cuisine_type TEXT,
        recipe TEXT
      )
    `);

    console.log("✅ All tables ready");
  } catch (err) {
    console.error("❌ DB init error:", err);
  }
};

initDB();

module.exports = pool;