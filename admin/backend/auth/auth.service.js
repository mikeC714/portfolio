import bcrypt from "bcrypt";
import db from "../config/postgres.config.js";

export default {
	async newUser(username, password){
		if(!username || !password) throw new AuthenticationError("Failed to provide valid field requirements. Please try again.");
		try{
			const salt = await bcrypt.genSalt(12);
			const safe = await bcrypt.hash(password, salt);
			const results = await db.query(
				`INSERT INTO users
					(username, password)
					VALUES($1, $2)
					RETURNING username, id
				`,[username, safe]
			)
			if(results.rows.length === 0) throw new AuthenticationError("Invalid credentials");
			return results.rows[0];
		}catch(err){
			throw err;
		}
	},
	async getUser(username){
		if(!username || !password) throw new AuthenticationError("Failed to provide valid field requirements. Please try again.");
		try{
			const results = await db.query(
				`SELECT 
					id, 
					username,
					created_at,
					password,
					role
				FROM users
				WHERE username = $1 
				`,[username]
			)
			
			if(results.rows.length === 0) throw new AuthenticationError("Invalid credentials");
			return results.rows[0]
		}catch(err){
			throw err;
		}
	},
	async deleteUser(id){
		if(!id) throw new AppError("Failed to provide userID.", 400);
		try{
			await db.query(
			`DELETE users
			WHERE id = $1
			`,[id]
			)
		}catch(err){
			throw err
		}
	}
}
