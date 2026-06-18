import { catchAsync } from "../utils/catchAsync.js";
import authService from "./auth.service.js";
import { AppError } from "../middleware/error.middleware.js";

export default { 
	login: catchAsync(async(req, res) => {
		const { username, password } = req.body;
		if(!username || !password) throw new AppError("Failed to provide vaild field requirements. Please try again.", 400);
	
		const user = await authService.getUser(username, password);
		await new Promise((res, rej) => {
			req.session.regenerate((err) => {
				if(err) rej(err);
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
	signUp: catchAsync(async(req,res) => {
		const { username, password } = req.body;
		if(!username || !password) throw new AppError("Failed to provide vaild field requirements. Please try again.", 400);

		const user = await authService.newUser(username, password);
		await new Promise((res, rej) => {
			req.session.regenerate((err) => {
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
	logOut: catchAsync(async(req,res) => {
		await new Promise((res, rej) => {
			req.session.destroy((err) => {
				if(err) rej(err);
				res();
			})
		})
		res.clearCookie();
		return res.status(200).json({ sucess: true });
	}),
	delete: catchAsync(async(req,res) => {
		await authService.deleteUser(req.session.userId);
		await new Promise((res, rej) => {
			req.session.destroy((err) => {
				if(err) rej(err);
				res();
			});
		});
		return res.status(200).json({ success: true });
	})
}
