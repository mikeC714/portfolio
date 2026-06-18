import db from "../config/postgres.config.js";
import { AppError } from "../middleware/error.middleware.js";
import fs from "node:fs/promises";
import path from "path";

export default{
	// async getProjects(id){
	// 	try{
	// 		const results = await db.query(
	// 		`SELECT 
	//
	// 		`
	// 		)
	// 	}catch(err){
	// 		throw err;
	// 	}
	// }
	async uploadNewProject(userId,{ title, img, status, msg, stack, link }){
		const validMimes = ["jpeg", "png", ]
		try{
			const imgType = path.extname(img);
			const imgBuffer = await fs.readFile(img);
			const key = await storeImage(imgBuffer, imgType);

			await db.query(
				`WITH project AS(
					INSERT INTO projects
						(user_id, title, status, msg, stack, link)
					VALUES($1, $2, $3, $4, $5, $6)
					RETURNING id
				)INSERT INTO screenshots
					(user_id, project_id, s3_key, type, size)
					SELECT $1, id, $7, $8, $9 
					FROM project
					RETURNING id
				`,[userId, title, status, msg, stack, link, key, imgType, imgBuffer.length]
			)
		}catch(err){
			throw err;
		}	
	}
}
