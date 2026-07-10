import express from "express";
import authControllers from "./auth.controllers.ts";
import authMiddleware from "./auth.middleware.ts";
export const authRouter = express.Router();



authRouter.post('/auth/signup', authControllers.signUp)
authRouter.post('/auth/login', authControllers.login)

authRouter.use(authMiddleware.requireAuth)

authRouter.post('/auth/logout', authControllers.logOut)
authRouter.delete('/auth/delete', authControllers.delete);

export default authRouter;
