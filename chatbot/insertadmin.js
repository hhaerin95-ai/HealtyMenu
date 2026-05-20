const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://dripculture_db_user:FPuV64u3L46x224jsM6RwMjUxO47R6mx@dpg-d86qspbbc2fs73b9s1f0-a.virginia-postgres.render.com/dripculture_db',
  ssl: { rejectUnauthorized: false }
});

const fix = async () => {
  await pool.query(`DROP TABLE IF EXISTS users CASCADE`);
  await pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )
  `);
  await pool.query(`
    INSERT INTO users (email, password, role)
    VALUES ('admin@healthymenu.com', 'admin123', 'admin')
  `);
  console.log('Done!');
  pool.end();
};

fix().catch(e => { console.log('Error:', e); pool.end(); });