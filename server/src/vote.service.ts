import type { Pool } from "pg";
import type { VOTE_TARGET, VOTE_ROW, VOTES } from "./types/vote.d.ts";

export class VoteService{
	private db:Pool
	constructor(db:Pool){
		this.db = db;
	}

	getVotes = async():Promise<VOTES> => {
		try{
			const query = await this.db.query<VOTE_ROW>(`SELECT name, count FROM languages`)
			return query.rows;
		}catch(e:any){
			throw new Error(`Failed to query votes`, e);
		}
	}

	inputVote = async(input:{vote:number | string, target:VOTE_TARGET}):Promise<VOTES | undefined> => {
		if(!input) return;	
		try{
			const query = await this.db.query<VOTE_ROW>(`
						  	WITH upsert AS(
								INSERT INTO languages(lang, count)
									VALUES($1, 1)
									ON CONFLICT(lang)
									DO UPDATE SET count = lang.count + 1
								RETURNING lang, count
							)
							SELECT name, count FROM upsert
							UNION ALL
							SELECT name, count FROM languages WHERE name NOT IN (SELECT name FROM upsert)
							ORDER BY name
						  `, [input.target]
						);
			return query.rows;
		}catch(e:any){
			throw new Error(`Invalid input`, e);
		}
	}
}

