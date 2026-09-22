import { Router } from "express";
import { GithubService } from "./github.service.ts";
import { GithubControllers } from "./github.controller.ts";
import { io } from "./server.ts";


export const router = Router();
const service = new GithubService(io);
const controller = new GithubControllers(service);

router.post("/webhook", controller.receive);
