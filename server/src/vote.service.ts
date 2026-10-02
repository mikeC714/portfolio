import type { Pool } from "pg";
import type { VOTE_TARGET, VOTE_INPUT, VOTES, VOTE_ROW } from "./types/vote.d.ts";

export class VoteService{
	private db:Pool
	constructor(db:Pool){
		this.db = db;
	}

	getVotes = async():Promise<VOTES> => {
		try{
			const query = await this.db.query<VOTE_ROW>(`SELECT lang, count FROM votes`)
			return query.rows;
		}catch(e:any){
			throw new Error(`Failed to query votes`, e);
		}
	}

	inputVote = async(input:VOTE_INPUT):Promise<Array<VOTE_ROW> | undefined> => {
		if(!input) return;	
		try{
			await this.db.query<VOTE_ROW>(`
								  UPDATE votes 
									SET count = count + 1
									WHERE lang = $1
								  `, [input]
								);
		}catch(e:any){
			throw new Error(`Invalid input:${e.message}`, e);
		}
	}
}

