import express from "express";
import authMiddleware from "../auth/auth.middleware.js"; 
import projectsControllers from "../controllers/projects.controllers.js";

export const projectRouter = express.Router();

projectRouter.use(authMiddleware.requireAccess);
projectRouter.use(authMiddleware.requireAccess);


projectRouter.get('/projects', projectsControllers.get);
projectRouter.post('/projects/add', projectsControllers.create);
projectRouter.patch('/projects/update', projectsControllers.update);
projectRouter.delete('/projects/delete', projectsControllers.delete);


