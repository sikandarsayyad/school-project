import mysql from "mysql2/promise";

// Create connection pool
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true,
});

async function initDb() {
  try {
    // Create DB if not exists
    await db.query(`CREATE DATABASE IF NOT EXISTS schooldb`);

    // Switch to db
    await db.query(`USE schooldb`);

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

    console.log("✅ Database and table ready!");
  } catch (err) {
    console.error("❌ DB Init Error:", err);
  }
}

// Run once at startup
initDb();
