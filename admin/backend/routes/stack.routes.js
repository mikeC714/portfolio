import express from "express";
import authMiddleware from "../auth/auth.middleware.js";

export const stackRouter = express.Router();

stackRouter.use(authMiddleware.requireAccess);
stackRouter.use(authMiddleware.requireAccess);

stackRouter.get('/stack');
stackRouter.put('/stack/update');
stackRouter.post('/stack/add');
stackRouter.delete('/stack/delete');
