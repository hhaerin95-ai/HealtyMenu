const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://dripculture_db_user:FPuV64u3L46x224jsM6RwMjUxO47R6mx@dpg-d86qspbbc2fs73b9s1f0-a.virginia-postgres.render.com/dripculture_db',
  ssl: { rejectUnauthorized: false }
});

const setup = async () => {
  // Semak table apa ada
  const tables = await pool.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  console.log('Tables:', tables.rows.map(r => r.table_name));

  // Create bmi_records kalau takde
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

  // Create food_records kalau takde
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

  console.log('Done! All tables created.');
  pool.end();
};

setup().catch(e => { console.log('Error:', e); pool.end(); });