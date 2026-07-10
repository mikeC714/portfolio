import express from "express";
import authMiddleware from "../auth/auth.middleware.ts";
import aboutMeControllers from "../controllers/aboutMe.controllers.ts";
export const aboutMeRouter = express.Router();

aboutMeRouter.use(authMiddleware.requireAccess);
aboutMeRouter.post('/about-me/add', authMiddleware.requireAuth, aboutMeControllers.setAndGet);
aboutMeRouter.patch('/about-me/update', authMiddleware.requireAuth, aboutMeControllers.update);


export default aboutMeRouter;


