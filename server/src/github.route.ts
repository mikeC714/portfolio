import { Router } from "express";
import { GithubService } from "./github.service.ts";
import { GithubControllers } from "./github.controller.ts";

export const githubRouter = Router();
const service = new GithubService();
const controller = new GithubControllers(service);

githubRouter.get("/api/commits", controller.commit);
