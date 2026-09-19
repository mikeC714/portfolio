import { Router } from "express";
import { VoteService } from "./vote.service.ts";
import { VoteController } from "./vote.controller.ts";
import { db } from "./config/postgres.config.ts";

const service = new VoteService(db);
const controller = new VoteController(service);

export const router = Router();

router.put("/api/vote", controller.updateVote);
router.get("/api/votes-get", controller.getVotes);



