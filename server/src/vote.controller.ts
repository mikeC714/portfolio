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
			return res.status(200).json({ success:true, votes:queryRes })
		}catch(e){
			throw e;
		}
	}

	updateVote = async(req:Request<{ ReqBody:VOTE_INPUT }>, res:Response) => {
		let { vote } = req.body;
		console.log("Vote input",vote)
		try{
			await this.service.inputVote(vote);
			return res.status(200).json({ success:true, vote });
		}catch(e){
			throw e;
		}
	}
}
