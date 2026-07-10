import { db, test_db } from "../config/postgres.config.ts";
import { AuthService } from "./auth.service.ts";
import { catchAsync } from "../utils/catchAsync.ts";
import { AuthenticationError, AccessError } from "../middleware/error.middleware.ts";
import { Response, Request, NextFunction } from "express";
const authService = new AuthService(test_db);

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
