import bcrypt from "bcrypt";
import db from "../config/postgres.config.js";
import { AppError, AuthenticationError } from "../middleware/error.middleware.js";
import User from "../src/types/user.js";

interface NewUser extends User{
	id: string,
	created_at:string,
	role:string,
}

export default {
	async newUser(user:User):Promise<NewUser>{
		const { username, password } = user;
		if(!username || !password) throw new AuthenticationError("Failed to provide valid field requirements. Please try again.");

		const salt = await bcrypt.genSalt(12);
		const safe = await bcrypt.hash(password as string, salt);
			
		const results = await db.query(
			`INSERT INTO users
			(username, password)
			VALUES($1, $2)
			RETURNING username, id
			`,[username, safe]
		)
		if(results.rows.length === 0) throw new AuthenticationError("Invalid credentials");
		
		return results.rows[0];
	},
	async getUser(username:User["username"]):Promise<NewUser>{
		if(!username) throw new AuthenticationError("Failed to provide valid field requirements. Please try again.");
		
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
	},
	async deleteUser(id:string){
		if(!id) throw new AppError("Failed to provide userID.", 400);
		try{
			await db.query(
			`DELETE users WHERE id = $1
			`,[id]
			)
		}catch(err){
			throw err
		}
	}
}
