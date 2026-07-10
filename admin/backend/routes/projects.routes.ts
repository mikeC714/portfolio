import express from "express";
import authMiddleware from "../auth/auth.middleware.ts"; 
import projectsControllers from "../controllers/projects.controllers.ts";

const projectRouter = express.Router();

projectRouter.use(authMiddleware.requireAccess);


projectRouter.get('/projects', authMiddleware.requireAuth, projectsControllers.get);
projectRouter.post('/projects/add', authMiddleware.requireAuth,	projectsControllers.create);
projectRouter.patch('/projects/update', authMiddleware.requireAuth, projectsControllers.update);
projectRouter.delete('/projects/delete', authMiddleware.requireAuth, projectsControllers.delete);




export default projectRouter;
