import { catchAsync } from "../utils/catchAsync.js";
import authService from "./auth.service.js";
import User from "../src/types/user.js";
import { AppError } from "../middleware/error.middleware.js";
import { Request, Response } from "express";


export default { 
	login: catchAsync(async(req:Request<{},{},User>, res:Response) => {
		const { username, password } = req.body;
		if(!username || !password) throw new AppError("Failed to provide vaild field requirements. Please try again.", 400);
	
		const user = await authService.getUser(username);
		await new Promise<void>((res, rej) =>{
			req.session.regenerate((err:any) => {
				if(err) { rej(err); return}
				req.session.userId = user.id;
				req.session.username = user.username;
				res();
			})
		});
		return res.status(200).json({
			success: true, 
			user
		});
	}),
	signUp: catchAsync(async(req:Request<{},{},User>, res:Response) => {
		const { username, password } = req.body;
		if(!username || !password) throw new AppError("Failed to provide vaild field requirements. Please try again.", 400);

		const user = await authService.newUser({ username, password });
		await new Promise<void>((res, rej) => {
			req.session.regenerate((err:any) => {
				if(err) rej(err);
				req.session.userId = user.id;
				req.session.username = user.username;
				res();
			});
		});
		return res.status(200).json({
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
		res.clearCookie("sugar_cookie");
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
		return res.status(200).json({ success: true });
	})
}
