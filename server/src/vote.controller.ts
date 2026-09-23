import type { Request, Response } from "express";
import type { VoteService } from "./vote.service.ts";
import type { VOTE_INPUT } from "./types/vote.d.ts";


export class VoteController{
	private service:VoteService;
	constructor(service:VoteService){
		this.service = service;
	}

	getVotes = async(req:Request, res:Response) => {
		try{
			const queryRes = await this.service.getVotes();
			return res.status(200).json({ success:true, queryRes })
		}catch(e){
			throw e;
		}
	}

	updateVote = async(req:Request<{ ReqBody:VOTE_INPUT }>, res:Response) => {
		try{
			const queryRes = await this.service.inputVote(req.body);
			return res.status(200).json({ sucess:true, queryRes })
		}catch(e){
			throw e;
		}
	}
}
