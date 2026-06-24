import db from "../config/postgres.config.js"; 
import AboutMe from "../src/types/aboutme.js";
import { AppError } from "../middleware/error.middleware.js";


export default async function storeAboutMe(userId:string, body:AboutMe):Promise<AboutMe>{
	const { bio, dob, stack, img } = body;
	try{
		const results = await db.query( 
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
}
