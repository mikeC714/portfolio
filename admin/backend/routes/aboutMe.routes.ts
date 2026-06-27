import express from "express";
import authMiddleware from "../auth/auth.middleware";
import aboutMeControllers from "../controllers/aboutMe.controllers.js";
export const aboutMeRouter = express.Router();

aboutMeRouter.use(authMiddleware.requireAccess);
aboutMeRouter.use(authMiddleware.requireAccess);

aboutMeRouter.post('/about-me/add', aboutMeControllers.setAndGet);
aboutMeRouter.patch('/about-me/update', aboutMeControllers.update);


