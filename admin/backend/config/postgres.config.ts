import pg from 'pg';
const { Pool } = pg;

const db = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT as number | undefined,
	database: process.env.DB
});

export const test_db = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT as number | undefined,
	database: process.env.DB_test
});
export default db;
