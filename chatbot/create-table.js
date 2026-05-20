const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

pool.query(`CREATE TABLE IF NOT EXISTS recipes (
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
)`).then(() => {
  console.log('✅ Table created');
  process.exit(0);
}).catch(e => {
  console.error(e.message);
  process.exit(1);
});