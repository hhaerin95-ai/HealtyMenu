const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "healthymenu.db"),
  (err) => {
    if (err) console.error(err);
    else console.log("✅ SQLite DB connected");
  }
);

// USERS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

// DEFAULT ADMIN
db.run(`
  INSERT OR IGNORE INTO users (email, password, role)
  VALUES ('admin@healthymenu.com', 'admin123', 'admin')
`);

// FOOD RECORDS
db.run(`
  CREATE TABLE IF NOT EXISTS food_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT,
    date TEXT,
    mealType TEXT,
    foodName TEXT,
    calories INTEGER,
    carbs INTEGER,
    protein INTEGER,
    fat INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS bmi_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT,
    height REAL,
    weight REAL,
    bmi REAL,
    category TEXT,
    date TEXT
  )
`);

// RECIPES TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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

console.log("DB PATH:", path.join(__dirname, "healthymenu.db"));

module.exports = db;