import { GithubService } from "./github.service.ts";
import type { Request, Response } from "express";

export class GithubControllers{
	private service:GithubService;

	constructor(service:GithubService){
		this.service = service;
	}

	receive = async(req:Request,res:Response) => {
		const header = req.header("x-github-event")
		if(!header){
			return res.status(401).send("Failed to send valid headers.");
		}
		if(!this.service.verifyEvent(header)){
			return res.status(401).send("Failed to verify webhook event.");
		}		
		try{
			await this.service.parse(req);
			return res.status(200).send("Received Webhook Data!");
		}catch(e:any){
			throw new Error(e)
		};
				
	}
}
