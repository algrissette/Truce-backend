import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


//setup the connection to the main database to return promises
dotenv.config();
/*
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'truce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default pool;
Local Connecton  */




const pool = mysql.createPool(process.env.DB_URL!);

export default pool;

{/* 

if (!process.env.MYSQLHOST || !process.env.MYSQLUSER || !process.env.MYSQLPASSWORD || !process.env.MYSQLDATABASE) {
  throw new Error('Database env vars are missing!');
}

// Create the pool synchronously
const pool = mysql.createPool({
  host: process.env.MYSQLHOST!,
  user: process.env.MYSQLUSER!,
  password: process.env.MYSQLPASSWORD!,
  database: process.env.MYSQLDATABASE!,
  port: Number(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10, // adjust as needed
  queueLimit: 0,
});

console.log('✅ MySQL pool created successfully!');

export default pool;
*/}