import authService from "./auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export default { 
	requireAuth: catchAsync(async(req,res,next) => {
		if(!req.session) throw new AuthError("An invalid session was provided. User is unauthorized");

		const user = await authService.getUser(req.session.userId);
		if(!user.id) throw new AuthError("Unauthorized user.");

		req.session.userId = user.id;
		req.session.username = user.username;
		next();
	}),
	requireAccess: catchAsync(async(req,res,next) => {
		if(req.session.role !== "admin") throw new AccessError("Access is denied. User is not authorized.");

		const user = await authService.getUser(req.session.userId);
		if(user.role !== "admin") throw new AccessError("Access is denied. User is not authorized.");

		req.session.role = user.role;
		next();
	})	

}
