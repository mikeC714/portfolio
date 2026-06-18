import express from "express";
import authMiddleware from "../auth/auth.middleware";
export const aboutMeRouter = express.Router();

aboutMeRouter.use(authMiddleware.requireAccess);
aboutMeRouter.use(authMiddleware.requireAccess);

aboutMeRouter.get('/about-me');
aboutMeRouter.put('/about-me/update');
aboutMeRouter.post('/about-me/add');
aboutMeRouter.delete('/about-me/delete');


