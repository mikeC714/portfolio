import { Router } from "express";
import { VoteService } from "./vote.service.ts";
import { VoteController } from "./vote.controller.ts";
import { db } from "./config/postgres.config.ts";

export const voteRouter = Router();
const service = new VoteService(db);
const controller = new VoteController(service);


voteRouter.put("/api/vote", controller.updateVote);
voteRouter.get("/api/votes-get", controller.getVotes);



