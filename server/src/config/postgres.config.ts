import { Pool } from "pg";

export const db = new Pool({
	host:"192.168.1.107",
	port:5432,
	database:"portfolio_votes",
	user:"postgres",
	password:"iamonpluto",
	connectionTimeoutMillis:5000,
});
