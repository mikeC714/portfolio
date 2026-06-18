import express from "express";
import authMiddleware from "../auth/auth.middleware.js"; 

export const projectRouter = express.Router();

projectRouter.use(authMiddleware.requireAccess);
projectRouter.use(authMiddleware.requireAccess);


projectRouter.get('/projects');
projectRouter.post('/projects/add');
projectRouter.put('/projects/update');
projectRouter.delete('/projects/delete');


