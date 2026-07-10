import AboutMe from "../src/types/aboutme.ts";
import Database from "../src/types/database.ts";
import { AppError } from "../middleware/error.middleware.ts";


export class AboutMeService{
	constructor(private readonly db:Database){
		this.db = db;
	}
	async storeAboutMe(userId:string, body:AboutMe):Promise<AboutMe>{
		const { bio, dob, stack, img } = body;
		try{
			const results = await this.db.query( 
				`INSERT INTO about
					(bio,dob,stack,img)
				VALUES($1,$2,$3,$4)
				WHERE user_id = $5
				RETURNING *
				`,[bio, dob, stack, img, userId]
			);
			if(results.rows.length === 0)throw new AppError("Failed to store about me.", 500);	
			return body;
		}catch(err){
			throw err;
		}
	};
	async update(userId:string, body:AboutMe){
		const { bio, dob, stack, img } = body;
		try{
			await this.db.query(
				`INSERT INTO about
					(user_id,bio,dob,stack,img)
				VALUES($1,$2,$3,$4,$5)
				ON CONFLICT(user_id)
				DO UPDATE SET 
					bio = EXCLUDED.bio,
					dob = EXCLUDED.dob,
					stack = EXCLUDED.stack,
					img = EXCLUDED.img
				WHERE about.bio IS DISTINCT FROM EXCLUDED.bio
					OR about.dob IS DISTINCT FROM EXCLUDED.dob
					OR about.stack IS DISTINCT FROM EXCLUDED.stack
					OR about.img IS DISTINCT FROM EXCLUDED.img
				RETURNING bio, dob, stack
				`
			),[bio, dob, stack, img, userId]
		}catch(err){
			throw err;
		}
	}
}


