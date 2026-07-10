import express from "express";
import authMiddleware from "../auth/auth.middleware.ts";
import stackControllers from "../controllers/stack.controllers.ts";

export const stackRouter = express.Router();

stackRouter.use(authMiddleware.requireAuth);
stackRouter.use(authMiddleware.requireAccess);

stackRouter.get('/stack', stackControllers.get) 
stackRouter.put('/stack/update/lang', stackControllers.updateLang);
stackRouter.put('/stack/update/framework', stackControllers.updateFramework);
// stackRouter.post('/stack/add');
stackRouter.put('/stack/update/lang', stackControllers.updateLang);
stackRouter.put('/stack/update/framework', stackControllers.updateFramework);
// stackRouter.delete('/stack/delete', stackControllers.deleteStack);


export default stackRouter;

