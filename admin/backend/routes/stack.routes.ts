import express from "express";
import authMiddleware from "../auth/auth.middleware.js";
import stackControllers from "../controllers/stack.controllers.js";

export const stackRouter = express.Router();

stackRouter.use(authMiddleware.requireAuth);
stackRouter.use(authMiddleware.requireAccess);

stackRouter.get('/stack', stackControllers.get) 
stackRouter.post('/stack/add');
stackRouter.put('/stack/update/lang', stackControllers.updateLang);
stackRouter.put('/stack/update/framework', stackControllers.updateFramework);
stackRouter.delete('/stack/delete', stackControllers.deleteStack);
