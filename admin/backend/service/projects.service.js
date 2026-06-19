import db from "../config/postgres.config.js";
import { AppError, AuthenticationError } from "../middleware/error.middleware.js";
import bucketService from "./s3.service.js";
import fs from "node:fs/promises";
import path from "path";

export default{
	async getProjects(userId){
		if(!userId) throw new AuthenticationError("Failed to provide all needed fields inorder to upload project.");
		try{
			const results = await db.query(
				`SELECT projects.*, screenshots.key
					FROM projects
					JOIN screenshots ON projects.id = screenshots.project_id
					WHERE projects.user_id = $1
				`,[userId]
			)
			// TODO
			// getImage will need an array of keys and must return 
			// images with their know destinations
			// const imgs = await bucketService.getImage();	
		
		return results.rows;
		}catch(err){
			throw err;
		}
	},
	async uploadNewProject(userId,{ title, img, status, msg, stack, link }){
		if(!userId) throw new AuthenticationError("Failed to provide user id.");
		if(!title || !img || !status || !msg || !stack || !link) throw new AppError("Failed to provide all needed fields inorder to upload project.");
		try{
			const imgType = path.extname(img);
			const imgBuffer = await fs.readFile(img);
			const key = await bucketService.storeImage(imgBuffer, imgType);

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
	},
	async updateProject(userId, { title, img, status, msg, stack, link }){
		if(!userId) throw new AuthenticationError("Failed to provide user id.");
		if(!title || !img || !status || !msg || !stack || !link) throw new AppError("Failed to provide all needed fields inorder to upload project.");
		try{
			await db.query(
				`UPDATE projects 
					SET title = $1, status = $2, msg = $3, stack = $4, link = $5
					WHERE user_id = $6
					AND (title, status, msg, stack, link) IS DISTINCT FROM ($1, $2, $3, $4, $5)
				`
			)
		}catch(err){
			throw err;
		}
	},
	async deleteProject(userId, project_id){
		if(!userId) throw new AuthenticationError("Failed to provide user id.");
		if(!project_id) throw new AppError("Failed to provide project id. Cannot delete project without valid project id.", 400);
		try{
			await db.query(
				`DELETE FROM projects
					WHERE user_id = $1
					AND id = $2
				`,[userId, project_id]
			)
		}catch(err){
			throw err;
		}
	}
}
