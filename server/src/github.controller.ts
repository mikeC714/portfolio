import { GithubService } from "./github.service.ts";
import type { Request, Response } from "express";

export class GithubControllers{
	private service:GithubService;

	constructor(service:GithubService){
		this.service = service;
	}

	commit = async(req:Request, res:Response) => {
		const query = req.query?.repo;	
		console.log("QUERY FROM COMMIT",query);
		if(!query){
			return res.status(400).json({ msg: `Github Error. Failed to provied query.`}); 
		}
		try{
			const resp = await this.service.req(query as string);
			return res.status(200).json({
				success:true,
				data:resp
			});
		}catch(e:any){
			throw e;
		}
	}
}
