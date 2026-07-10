import { catchAsync } from "../utils/catchAsync.ts";
import { db, test_db } from "../config/postgres.config.ts";
import { AuthService } from "./auth.service.ts";
import bcrypt from "bcrypt";
import User from "../src/types/user.ts";
import { AppError } from "../middleware/error.middleware.ts";
import { Request, Response } from "express";
const authService = new AuthService(test_db);


export default { 
	login: catchAsync(async(req:Request<{},{},User>, res:Response) => {
		const { username, password, secret } = req.body;
		if(!username || !password) throw new AppError("Failed to provide vaild field requirements. Please try again.", 400);
		if(secret !== process.env.SECRET) return res.status(401).json({ error: "You my friend are unauthorized." });

		const user = await authService.getUser(username);
		const valid = await bcrypt.compare(password, user.password);
		if(!valid) return res.status(401).json({ error: "Invalid credentials. Please try again." });

		await new Promise<void>((res, rej) =>{
			req.session.regenerate((err:any) => {
				if(err) { rej(err); return}
				req.session.userId = user.id;
				req.session.username = user.username;
				req.session.role = "admin";
				res();
			})
		});
		return res.status(200).json({
			success: true, 
			user
		});
	}),
	signUp: catchAsync(async(req:Request<{},{},User>, res:Response) => {
		const { username, password, secret } = req.body;
		if(!username || !password) throw new AppError("Failed to provide vaild field requirements. Please try again.", 400);
		if(secret !== process.env.SECRET) return res.status(401).json({ error: "You my friend are unauthorized." });

		const user = await authService.newUser({ username, password, role:"admin" });

		await new Promise<void>((res, rej) => {
			req.session.regenerate((err:any) => {
				if(err){  
					return rej(err);
				}	
				req.session.userId = user.id;
				req.session.username = user.username;
				req.session.role = "admin";
				req.session.save((err) => {
					return rej(err);	
				});
				res(user);
			});
		});
		return res.status(201).json({
			success: true,
			user
		});
	}),
	logOut: catchAsync(async(req:Request<{},{},User>, res:Response) => {
		await new Promise<void>((res, rej) => {
			req.session.destroy((err:any) => {
				if(err){ rej(err); return }
				res();
			})
		})
		res.clearCookie(process.env.SESSION_SECRET as string);
		return res.status(200).json({ sucess: true });
	}),
	delete: catchAsync(async(req:Request<{},{},User>, res:Response) => {
		await authService.deleteUser(req.session.userId as string);
		await new Promise<void>((res, rej) => {
			req.session.destroy((err:any) => {
				if(err) rej(err);
				res();
			});
		});
		res.clearCookie(process.env.SESSION_SECRET as string)
		return res.status(200).json({ success: true });
	})
}
