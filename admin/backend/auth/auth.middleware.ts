import authService from "./auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AuthError, AccessError } from "../middleware/error.middleware.js";
import { Response, Request, NextFunction } from "express";

export default { 
	requireAuth: catchAsync(async(req:Request,res:Response,next:NextFunction) => {
		if(!req.session) throw new AuthError("An invalid session was provided. User is unauthorized");

		const user = await authService.getUser(req.session.userId);
		if(!user.id) throw new AuthError("Unauthorized user.");
		if(!user.role) req.session.role = null;

		req.session.userId = user.id;
		req.session.username = user.username;
		next();
	}),
	requireAccess: catchAsync(async(req:Request,res:Response,next:NextFunction) => {
		if(req.session.role !== "admin") throw new AccessError("Access is denied. User is not authorized.");

		const user = await authService.getUser(req.session.userId);
		if(user.role !== "admin") throw new AccessError("Access is denied. User is not authorized.");

		req.session.role = user.role;
		next();
	})	

}
