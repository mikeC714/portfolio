import db from "../config/postgres.config.js";
import { AppError, AuthenticationError } from "../middleware/error.middleware.js";
import { Project } from "../src/types/project.d.js"
import bucketService from "./s3.service.js";
import fs from "node:fs/promises";
import path from "path";


export default{
	async getOneProject(userId:string, projectId:string):Promise<Project>{
		if(!userId) throw new AuthenticationError("Failed to provide userId inorder to get project");
		try{
			const results = await db.query(
				`SELECT * 
					FROM projects
					WHERE id = $1
					AND user_id = $2
				`,[projectId, userId]
			);
			return results.rows[0]; 
		}catch(err){
			throw err;
		}
	},
	async getProjects(userId:string):Promise<Project>{
		if(!userId) throw new AuthenticationError("Failed to provide userId inorder to upload project.");
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
		
		return results.rows as any;
		}catch(err){
			throw err;
		}
	},
	async uploadNewProject(userId:string, project: Project){
 		const { title, img, msg, stack, link } = project; 
		if(!userId) throw new AuthenticationError("Failed to provide user id.");
		if(!title || !img || !msg || !stack || !link) throw new AppError("Failed to provide all needed fields inorder to upload project.", 400);
		try{
			const imgType = path.extname(img);
			const imgBuffer = await fs.readFile(img);
			const key = await bucketService.storeImage(imgBuffer, imgType);

			await db.query(
				`WITH project AS(
					INSERT INTO projects
						(user_id, title, msg, stack, link)
					VALUES($1, $2, $3, $4, $5)
					RETURNING id
				)INSERT INTO screenshots
					(user_id, project_id, s3_key, type, size)
					SELECT $1, id, $6, $7, $8
					FROM project
					RETURNING id
				`,[userId, title, msg, stack, link, key, imgType, imgBuffer.length]
			)
		}catch(err){
			throw err;
		}	
	},
	async updateProject(userId:string, project: Project){
		const { title, img, msg, stack, link } = project;
		if(!userId) throw new AuthenticationError("Failed to provide user id.");
		if(!title || !img || !msg || !stack || !link) throw new AppError("Failed to provide all needed fields inorder to upload project.", 400);
		try{
			await db.query(
				`UPDATE projects 
					SET title = $1, msg = $2, stack = $3, link = $4
					WHERE user_id = $5 
					AND (title,msg, stack, link) IS DISTINCT FROM ($1, $2, $3, $4)
				`
			)
		}catch(err){
			throw err;
		}
	},
	async deleteProject(userId:string, project_id:string){
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
