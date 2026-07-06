import authService from "./auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AuthenticationError, AccessError } from "../middleware/error.middleware.js";
import { Response, Request, NextFunction } from "express";

export default { 
	requireAuth: catchAsync(async(req:Request,res:Response,next:NextFunction) => {
		if(!req.session) throw new AuthenticationError("An invalid session was provided. User is unauthorized");

		const user = await authService.getUser(req.session.userId as string);
		if(!user.id) throw new AuthenticationError("Unauthorized user.");
		if(!user.role) req.session.role = null;

		req.session.userId = user.id;
		req.session.username = user.username;
		next();
	}),
	requireAccess: catchAsync(async(req:Request,res:Response,next:NextFunction) => {
		if(req.session.role !== "admin") throw new AccessError("Access is denied. User is not authorized.");

		const user = await authService.getUser(req.session.userId as string);
		if(user.role !== "admin") throw new AccessError("Access is denied. User is not authorized.");

		req.session.role = user.role;
		next();
	})	

}
