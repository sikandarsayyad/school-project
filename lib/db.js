import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
  connectionLimit: 5,
});

async function initDb() {
  try {
    // Create table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        contact BIGINT,
        email_id TEXT,
        image TEXT
      )
    `);

    console.log("✅ Table ready in DB:", process.env.DB_NAME);
  } catch (err) {
    console.error("❌ DB Init Error:", err);
  }
}

initDb();
